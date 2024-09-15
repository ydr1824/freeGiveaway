import { eq, db, items, categories, conditions, users } from '../db.js';




export async function createItem(itemData) {
  const { name, description, longDescription, urlFileName, expiryDate, categoryId, conditionId, userId } = itemData;
  const values = {
    name,
    description,
    long_description: longDescription,
    image_url: urlFileName,
    category_id: categoryId,
    condition_id: conditionId,
    user_id: userId
  };
  console.log(values)
  const item = await db.insert(items).values(itemData).returning(({ id: users.id }));
  console.log(item)
  return item;
}

export async function findAllItems() {
  const countResult = await db.select().from(items); // Adjust based on your library
  const count = countResult.length; // Assuming it returns an array

  if (count === 0) {
    return []; // Return an empty array if no records exist
  }

  const itemList = await db.select(
    //{
    //  id: items.id,
    //  name: items.name,
    //  condition: conditions.name
    //}
  ).from(items)
    .leftJoin(categories, eq(items.category_id, categories.id))
    .leftJoin(conditions, eq(items.condition_id, conditions.id))
    .leftJoin(users, eq(items.user_id, users.id));
  return itemList;
}
export const findItemById = async (itemId) => {
  console.error(itemId)
  try {
    const item = await db
      .select()
      .from(items)
      .where(eq(items.id, itemId)) // Using SQL template
      .execute();
    return item.length > 0 ? item[0] : null;
  } catch (error) {
    console.error('Error retrieving item:', error);
    throw new Error('Database query failed: ' + error);
  }
};

// Function to update an item status
export const updateItemStatus = async (itemId, status) => {
  try {
    const updatedItem = await db
      .update(items)
      .set({ status })
      .where(eq(items.id, itemId)) 
      .execute();
    return updatedItem;
  } catch (error) {
    console.error('Error updating item status:', error);
    throw new Error('Database update failed');
  }
};
// Function to update an item with an image URL
export const updateItemImage = async (itemId, imageUrl) => {
  try {
    const updatedItem = await db
      .update(items)
      .set({ imageUrl })
      .where(items.id.eq(itemId))
      .execute();
    return updatedItem;
  } catch (error) {
    console.error('Error updating item image:', error);
    throw new Error('Database update failed');
  }
};