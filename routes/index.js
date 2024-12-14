require('dotenv').config();
const express = require('express');
const connectDB = require('../modules/index'); 
const { ObjectId } = require('mongodb');
const router = express.Router();
const controllers = require('../controllers/index')


router.get('/', controllers.welcome); // Use the welcome function for the root route


// ###########################
// CONTROLLER FUNCTIONS FOR INCOME
// ###########################

/**
 * @swagger
 * /income/{userId}:
 *   get:
 *     summary: Get all income for a user
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user to fetch income for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of income records
 *       500:
 *         description: Error fetching income
 */
router.get('/income/:userId', controllers.getAllIncome);


/**
 * @swagger
 * /income/add:
 *   post:
 *     summary: Add new income
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               amount:
 *                 type: number
 *               source:
 *                 type: string
 *     responses:
 *       201:
 *         description: Income added successfully
 *       400:
 *         description: All fields are required.
 */
router.post('/income/add', controllers.addIncome);


/**
* @swagger
* /income/update/{id}:
*   put:
*     summary: Update an existing income entry
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: The ID of the income entry to update
*         schema:
*           type: string 
*     requestBody:
*       required: true 
*       content:
*         application/json :
*           schema :
*             type : object 
*             properties :
*               amount :
*                 type : number 
*               source :
*                 type : string 
*
*     responses:
*       200:
*         description: Income updated successfully 
*       404:
*         description: Income not found or update failed 
*/
router.put('/income/update/:id', controllers.updateIncome);

/**
* @swagger
* /income/delete/{id}:
*   delete:
*     summary: Delete an existing income entry 
*     parameters:
*       - name: id 
*         in: path 
*         required: true 
*         description: The ID of the income entry to delete 
*         schema:
*           type: string 
*
*     responses:
*       204:
*         description: Income deleted successfully 
*       404:
*         description: Income not found 
*/
router.delete('/income/delete/:id', controllers.deleteIncome);


// ###########################
// CONTROLLER FUNCTIONS FOR EXPENSES
// ###########################

/**
 * @swagger
 * /expenses/{userId}:
 *   get:
 *     summary: Retrieve all expenses for a specific user
 *     description: Fetches a list of all expenses associated with the provided user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user whose expenses are to be fetched.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of expenses for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier for the expense.
 *                   amount:
 *                     type: number
 *                     description: The amount of the expense.
 *                   category:
 *                     type: string
 *                     description: The category of the expense.
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: The date when the expense was incurred.
 *       404:
 *         description: User not found or no expenses available.
 *       500:
 *         description: Internal server error.
 */
router.get('/expenses/:userId', controllers.getAllExpenses);

/**
 * @swagger
 * /expenses/add:
 *   post:
 *     summary: Add a new expense
 *     description: Creates a new expense entry for a specified user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user to whom the expense belongs.
 *               amount:
 *                 type: number
 *                 description: The amount of the expense.
 *               category:
 *                 type: string
 *                 description: The category of the expense (e.g., food, transport).
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The date when the expense was incurred.
 *     responses:
 *       201:
 *         description: Expense added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Expense added successfully"
 *                 expenseId:
 *                   type: string
 *                   description: The unique identifier for the newly created expense.
 *       400:
 *         description: Bad request due to missing fields.
 *       500:
 *         description: Internal server error.
 */
router.post('/expenses/add', controllers.addExpense);

/**
 * @swagger
 * /expenses/{id}:
 *   put:
 *     summary: Update an existing expense
 *     description: Updates the details of a specified expense by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the expense to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The new amount of the expense.
 *               category:
 *                 type: string
 *                 description: The new category of the expense (e.g., food, transport).
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The new date when the expense was incurred.
 *     responses:
 *       200:
 *         description: Expense updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Expense updated successfully"
 *                 updatedExpense:
 *                   type: object
 *                   description: The updated expense object.
 *       400:
 *         description: Bad request due to missing fields.
 *       404:
 *         description: Expense not found or update failed.
 *       500:
 *         description: Internal server error.
 */
router.put('/expenses/update/:id', controllers.updateExpense);


/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     description: Deletes a specified expense by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the expense to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Expense deleted successfully.
 *       400:
 *         description: Invalid ID format.
 *       404:
 *         description: Expense not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/expenses/delete/:id', controllers.deleteExpense);


// ###########################
// CONTROLLER FUNCTIONS FOR CREDIT CARDS
// ###########################

/**
 * @swagger
 * /creditcards/{userId}:
 *   get:
 *     summary: Retrieve all credit cards for a specific user
 *     description: Fetches a list of all credit cards associated with the provided user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user whose credit cards are to be fetched.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of credit cards for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier for the credit card.
 *                   cardNumber:
 *                     type: string
 *                     description: The masked card number (e.g., "**** **** **** 1234").
 *                   expirationDate:
 *                     type: string
 *                     format: date-time
 *                     description: The expiration date of the credit card.
 *                   cardHolderName:
 *                     type: string
 *                     description: The name of the cardholder.
 *       404:
 *         description: User not found or no credit cards available.
 *       500:
 *         description: Internal server error.
 */
router.get('/creditcards/:userId', controllers.getAllCreditCards);


/**
 * @swagger
 * /creditcards:
 *   post:
 *     summary: Add a new credit card
 *     description: Creates a new credit card entry for a specified user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user to whom the credit card belongs.
 *               cardNumber:
 *                 type: string
 *                 description: The full credit card number (should be stored securely).
 *               cardholderName:
 *                 type: string
 *                 description: The name of the cardholder.
 *               expirationDate:
 *                 type: string
 *                 format: date-time
 *                 description: The expiration date of the credit card.
 *               cvv:
 *                 type: string
 *                 description: The CVV code of the credit card (should be stored securely).
 *               creditLimit:
 *                 type: number
 *                 description: The credit limit for the card.
 *               currentBalance:
 *                 type: number
 *                 description: The current balance on the credit card.
 *     responses:
 *       201:
 *         description: Credit card added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Credit card added successfully"
 *                 creditCardId:
 *                   type: string
 *                   description: The unique identifier for the newly created credit card.
 *       400:
 *         description: Bad request due to missing fields.
 *       500:
 *         description: Internal server error.
 */
router.post('/creditcards/add', controllers.addCreditCard);



/**
 * @swagger
 * /creditcards/{id}:
 *   put:
 *     summary: Update an existing credit card
 *     description: Updates the details of a specified credit card by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the credit card to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardNumber:
 *                 type: string
 *                 description: The full credit card number (should be stored securely).
 *               cardholderName:
 *                 type: string
 *                 description: The name of the cardholder.
 *               expirationDate:
 *                 type: string
 *                 format: date-time
 *                 description: The expiration date of the credit card.
 *               cvv:
 *                 type: string
 *                 description: The CVV code of the credit card (should be stored securely).
 *               creditLimit:
 *                 type: number
 *                 description: The credit limit for the card.
 *               currentBalance:
 *                 type: number
 *                 description: The current balance on the credit card.
 *     responses:
 *       200:
 *         description: Credit card updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Credit card updated successfully"
 *                 updatedCreditCard:
 *                   type: object
 *                   description: The updated credit card object.
 *       400:
 *         description: Bad request due to missing fields.
 *       404:
 *         description: Credit card not found or update failed.
 *       500:
 *         description: Internal server error.
 */
router.put('/creditcards/update/:id', controllers.updateCreditCard);

/**
 * @swagger
 * /creditcards/delete/{id}:
 *   delete:
 *     summary: Delete a credit card
 *     description: Deletes a credit card from the database using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the credit card to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Credit card deleted successfully.
 *       404:
 *         description: Credit card not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/creditcards/delete/:id', controllers.deleteCreditCard);

/**
 * @swagger
 * /debitcards/{userId}:
 *   get:
 *     summary: Retrieve all debit cards for a specific user
 *     description: Fetches a list of all debit cards associated with the provided user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user whose debit cards are to be fetched.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of debit cards for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier for the debit card.
 *                   cardNumber:
 *                     type: string
 *                     description: The masked card number (e.g., "**** **** **** 1234").
 *                   expirationDate:
 *                     type: string
 *                     format: date-time
 *                     description: The expiration date of the debit card.
 *                   cardHolderName:
 *                     type: string
 *                     description: The name of the cardholder.
 *       404:
 *         description: User not found or no debit cards available.
 *       500:
 *         description: Internal server error.
 */
router.get('/debitcards/:userId', controllers.getAllDebitCards);

/**
 * @swagger
 * /debitcards:
 *   post:
 *     summary: Add a new debit card
 *     description: Creates a new debit card entry for a specified user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user to whom the debit card belongs.
 *               cardNumber:
 *                 type: string
 *                 description: The full debit card number (should be stored securely).
 *               cardholderName:
 *                 type: string
 *                 description: The name of the cardholder.
 *               expirationDate:
 *                 type: string
 *                 format: date-time
 *                 description: The expiration date of the debit card.
*               cvv:
*                 type: string
*                 description: The CVV code of the debit card (should be stored securely).
*               currentBalance:
*                 type: number
*                 description: The current balance on the debit card.
*     responses:
*       201:
*         description: Debit card added successfully.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: "Debit card added successfully"
*                 debitCardId:
*                   type: string
*                   description: The unique identifier for the newly created debit card.
*       400:
*         description: Bad request due to missing fields.
*       500:
*         description: Internal server error.
*/
router.post('/debitcards/add', controllers.addDebitCard);


/**
 * @swagger
 * /debitcards/{id}:
 *   put:
 *     summary: Update an existing debit card
 *     description: Updates the details of a specified debit card by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the debit card to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardNumber:
 *                 type: string
 *                 description: The full debit card number (should be stored securely).
 *               cardholderName:
 *                 type: string
 *                 description: The name of the cardholder.
 *               expirationDate:
 *                 type: string
 *                 format: date-time
 *                 description: The expiration date of the debit card.
 *               cvv:
 *                 type: string
 *                 description: The CVV code of the debit card (should be stored securely).
 *               currentBalance:
 *                 type: number
 *                 description: The current balance on the debit card.
 *     responses:
 *       200:
 *         description: Debit card updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Debit card updated successfully"
 *                 updatedDebitCard:
 *                   type: object
 *                   description: The updated debit card object.
 *       400:
 *         description: Bad request due to missing fields.
 *       404:
 *         description: Debit card not found or update failed.
 *       500:
 *         description: Internal server error.
 */
router.put('/debitcards/update/:id', controllers.updateDebitCard);



/**
 * @swagger
 * /debitcards/{id}:
 *   delete:
 *     summary: Delete a debit card
 *     description: Deletes a specified debit card by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the debit card to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Debit card deleted successfully.
 *       400:
 *         description: Invalid ID format.
 *       404:
 *         description: Debit card not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/debitcards/delete/:id', controllers.deleteDebitCard);



module.exports = router;