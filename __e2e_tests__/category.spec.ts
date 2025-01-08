import { expect, test } from "@playwright/test";
import { log } from "console";

test.describe('Category CRUD', () => {
  test('CRUD Actions testing', async ({ page }) => {
    //A user needs to be logged in to access the category page
    await page.goto('/login');
    await page.getByPlaceholder('Email').fill('sadmin@example.com');
    await page.getByPlaceholder('Password').fill('123test123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForURL('/');

    await page.goto('admin/category');
    await expect(page.getByRole('button', { name: 'Add a new category' })).toBeVisible();


    //Add a new category
    await page.getByRole('button', { name: 'Add a new category' }).click();

    await page.getByRole('textbox', { name: 'Name' }).fill('PlayWright_Test_category');
    await page.getByRole('textbox', { name: 'Description' }).fill('Test category description');
    await page.getByRole('button', { name: 'Create category' }).click();
    
    await page.waitForURL('admin/category');

    await expect(page.getByTestId('category-name-PlayWright_Test_category')).toBeVisible();


    //Update a category
    await page.getByTestId('category-update-PlayWright_Test_category').click();

    await page.getByRole('textbox', { name: 'Name' }).fill('PlayWright_Test_category');
    await page.getByRole('textbox', { name: 'Description' }).fill('Test category description UPDATED');
    await page.getByRole('button', { name: 'Update category' }).click();
    await page.waitForURL('admin/category');

    const element = await page.getByTestId('category-updated-description-PlayWright_Test_category').textContent();
    
    expect(element).toBe('Test category description UPDATED'); 


    //Delete a category
    await page.getByTestId('category-delete-PlayWright_Test_category').click();

    await expect(page.getByTestId('category-name-PlayWright_Test_category')).not.toBeVisible();
  });
});
