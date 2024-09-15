import { eq, db, and, items, categories, conditions, users } from "../db.js";

export async function createItem(itemData) {
  const {
    name,
    description,
    longDescription,
    urlFileName,
    categoryId,
    conditionId,
    userId,
  } = itemData;
  const values = {
    name,
    description,
    long_description: longDescription,
    image_url: urlFileName,
    category_id: categoryId,
    condition_id: conditionId,
    user_id: userId,
  };
  const item = await db
    .insert(items)
    .values(values)
    .returning({ id: users.id });
  console.log(item);
  return item;
}

export async function findAllItems() {
  const countResult = await db.select().from(items); // Adjust based on your library
  const count = countResult.length; // Assuming it returns an array

  if (count === 0) {
    return []; // Return an empty array if no records exist
  }

  const itemList = await db
    .select(/*{
      id: items.id,
      name: items.name,
      condition: conditions.name,
    }*/)
    .from(items)
    .where(eq(items.active, true))
    //.leftJoin(categories, eq(items.category_id, categories.id))
    .leftJoin(conditions, eq(items.condition_id, conditions.id))
   // .leftJoin(users, eq(items.user_id, users.id));
  return itemList.map((item)=>({
    id: item.items.id,
    name: item.items.name,
    url: item.items.image_url,
    condition: item.conditions.name,
    description: item.items.description,
  }));
}
export const findItemById = async (itemId) => {
  console.error(itemId);
  try {
    const item = await db
      .select()
      .from(items)
      .where(and(eq(items.id, itemId), eq(items.active, true))) // Using SQL template
      .execute();
    return item.length > 0 ? item[0] : null;
  } catch (error) {
    console.error("Error retrieving item:", error);
    throw new Error("Database query failed: " + error);
  }
};

// Function to update an item status
export const updateItemStatus = async (itemId, { active }) => {
  try {
    const updatedItem = await db
      .update(items)
      .set({ active })
      .where(eq(items.id, itemId))
      .returning({ active: items.active });
    return updatedItem;
  } catch (error) {
    console.error("Error updating item status:", error);
    throw new Error("Database update failed");
  }
};
// Function to update an item with an image URL
export const updateItemImage = async (itemId, imageUrl) => {
  try {
    const updatedItem = await db
      .update(items)
      .set({ imageUrl })
      .where(eq(items.id, itemId))
      .execute();
    return updatedItem;
  } catch (error) {
    console.error("Error updating item image:", error);
    throw new Error("Database update failed");
  }
};
