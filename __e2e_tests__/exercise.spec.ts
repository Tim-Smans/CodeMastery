import { expect, test } from "@playwright/test";

test.describe('Exercise CRUD', () => {
  test('CRUD Actions testing', async ({ page }) => {
    //A user needs to be logged in to access the exercise page
    await page.goto('/login');
    await page.getByPlaceholder('Email').fill('sadmin@example.com');
    await page.getByPlaceholder('Password').fill('123test123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForURL('/');

    await page.goto('admin/exercise');
    await expect(page.getByRole('button', { name: 'Add a new exercise' })).toBeVisible();


    //Add a new exercise
    await page.getByRole('button', { name: 'Add a new exercise' }).click();

    await page.getByRole('textbox', { name: 'Title' }).fill('PlayWright_Test_exercise');
    await page.getByRole('textbox', { name: 'Description' }).fill('Test exercise description');
    await page.getByRole('button', { name: 'Create exercise' }).click();
    
    await page.waitForURL('admin/exercise');

    await expect(page.getByTestId('exercise-name-PlayWright_Test_exercise')).toBeVisible();

    //Delete a category
    await page.getByTestId('exercise-delete-PlayWright_Test_exercise').click();

    await expect(page.getByTestId('exercise-name-PlayWright_Test_exercise')).not.toBeVisible();
  });
});
