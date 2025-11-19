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

export type TargetUpdate = TargetCreate & {
  id: number;
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

  async function remove(id: number) {
   await database.runAsync("DELETE FROM targets WHERE id = ?;", id);

  }

  function show(id: number) {
    return database.getFirstAsync<TargetResponse>(
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
      WHERE targets.id = ${id}
      GROUP BY targets.id, targets.name, targets.amount, targets.created_at, targets.updated_at;
      `
    );
  }

  async function update(data: TargetUpdate) {
    const statement = await database.prepareAsync(
      `
      UPDATE targets SET
      name = $name,
      amount = $amount,
        updated_at = CURRENT_TIMESTAMP
        WHERE id = $id;
    `
    );
    await statement.executeAsync({
      $name: data.name.trim(),
      $amount: data.amount,
      $id: data.id,
    });
    await statement.finalizeAsync();
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
    show,
    update,
    remove,
    listBySavedValues,
  };
}
