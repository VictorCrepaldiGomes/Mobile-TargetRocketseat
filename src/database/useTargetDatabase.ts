import { useSQLiteContext } from "expo-sqlite";

export type TargetCreate = {
  name: string;
  amount: number;
};

export type TargetResponse = {
  id: number;
  name: string;
  amount: number;
  current: number;
  percentage: number;
  created_at: Date;
  updated_at: Date;
};

export function useTargetDatabase() {
  const database = useSQLiteContext();

  function listBySavedValues() {
    return database.getAllAsync<TargetResponse>(
      `
      SELECT 
        targets.id, 
        targets.name, 
        targets.amount, 
        COALESCE(SUM(transactions.amount), 0) AS current, 
        COALESCE((SUM(transactions.amount) / targets.amount) * 100, 0) AS percentage, 
        targets.created_at, 
        targets.updated_at 
      FROM targets
      LEFT JOIN transactions ON targets.id = transactions.target_id
      GROUP BY targets.id, targets.name, targets.amount, targets.created_at, targets.updated_at
      ORDER BY current DESC;
    `
    );
  }

  async function create(data: TargetCreate) {
    if (
      !data.name ||
      typeof data.name !== "string" ||
      data.name.trim() === ""
    ) {
      throw new Error("Nome da meta é obrigatório");
    }

    if (
      !data.amount ||
      typeof data.amount !== "number" ||
      data.amount <= 0 ||
      isNaN(data.amount)
    ) {
      throw new Error("Valor da meta deve ser um número maior que zero");
    }

    const statement = await database.prepareAsync(
      `
      INSERT INTO targets (name, amount)
      VALUES ($name, $amount);
    `
    );

    await statement.executeAsync({
      $name: data.name.trim(),
      $amount: data.amount,
    });
    await statement.finalizeAsync();
  }
  return {
    create,
    listBySavedValues,
  };
}
