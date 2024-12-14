require('dotenv').config();
const connectDB = require('../modules/index'); 
const { ObjectId } = require('mongodb'); 


const welcome = async (req, res) => {
    res.json("Welcome to the Financial API");
};

// ###########################
// CONTROLLER FUNCTIONS FOR INCOME
// ###########################


const getAllIncome = async (req, res) => {
    try {
        const userId = req.params.userId;
        const income = await connectDB.getAllIncome(userId);
        res.json(income);
    } catch (error) {
        console.error("Error fetching all income:", error);
        res.status(500).json({ error: "Error fetching income" });
    }
};


const addIncome = async (req, res) => {
    try {
        const { userId, amount, source } = req.body;
        if (!userId || !amount || !source) {
            return res.status(400).json({ error: "All fields are required." });
        }
        const newIncome = await connectDB.addIncome({ userId, amount, source });
        res.status(201).json({ message: "Income added successfully", incomeId: newIncome._id });
    } catch (error) {
        console.error("Error adding income:", error);
        res.status(500).json({ error: "Error adding income" });
    }
};


const updateIncome = async (req, res) => {
    try {
        const id = req.params.id;
        const { amount, source } = req.body;
        if (!amount || !source) {
            return res.status(400).json({ error: "All fields are required." });
        }
        const updatedIncome = await connectDB.updateIncome(id, { amount, source });
        if (!updatedIncome) {
            return res.status(404).json({ error: "Income not found or update failed" });
        }
        res.status(200).json({ message: "Income updated successfully", updatedIncome });
    } catch (error) {
        console.error("Error updating income:", error);
        res.status(500).json({ error: "Error updating income" });
    }
};


const deleteIncome = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
        const result = await connectDB.deleteIncome(id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Income not found" });
        }
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting income:", error);
        res.status(500).json({ error: "Error deleting income", details: error.message });
    }
};

// ###########################
// CONTROLLER FUNCTIONS FOR EXPENSES
// ###########################


const getAllExpenses = async (req, res) => {
    try {
        const userId = req.params.userId;
        const expenses = await connectDB.getAllExpenses(userId);
        res.json(expenses);
    } catch (error) {
        console.error("Error fetching all expenses:", error);
        res.status(500).json({ error: "Error fetching expenses" });
    }
};



const addExpense = async (req, res) => {
    try {
        const { userId, amount, category, description, dateIncurred } = req.body;

        // Validate input fields to ensure all required data is provided
        if (!userId || !amount || !category || !description || !dateIncurred) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Add the new expense to the database and await its result
        const newExpense = await connectDB.addExpense({ userId, amount, category, description, dateIncurred });

        // Respond with a success message and the ID of the newly created expense
        return res.status(201).json({
            message: "Expense added successfully",
            expenseId: newExpense._id,
        });
    } catch (error) {
        // Log the error and respond with a server error message
        console.error("Error adding expense:", error);
        return res.status(500).json({ error: "Error adding expense" });
    }
};




const updateExpense = async (req, res) => {
    try {
        const id = req.params.id;
        const { amount, category, date } = req.body;

        // Validate input fields to ensure all required data is provided
        if (!amount || !category || !date) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Update the expense in the database and await its result
        const updatedExpense = await connectDB.updateExpense(id, { amount, category, date });

        // Check if the update was successful or if the expense was not found
        if (!updatedExpense) {
            return res.status(404).json({ error: "Expense not found or update failed" });
        }

        // Respond with a success message and the updated expense details
        res.status(200).json({ message: "Expense updated successfully", updatedExpense });
    } catch (error) {
        // Log the error and respond with a server error message
        console.error("Error updating expense:", error);
        res.status(500).json({ error: "Error updating expense" });
    }
};


const deleteExpense = async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const result = await connectDB.deleteExpense(id);

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Expense not found" });
        }

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({ error: "Error deleting expense", details: error.message });
    }
};

// ###########################
// CONTROLLER FUNCTIONS FOR CREDIT CARDS
// ###########################


const getAllCreditCards = async (req, res) => {
    try {
        const userId = req.params.userId;
        const creditCards = await connectDB.getAllCreditCards(userId);
        res.json(creditCards);
    } catch (error) {
        console.error("Error fetching all credit cards:", error);
        res.status(500).json({ error: "Error fetching credit cards" });
    }
};


const addCreditCard = async (req, res) => {
    try {
        const { userId, cardNumber, cardholderName, expirationDate, cvv, creditLimit, currentBalance } = req.body;

        // Validate input fields to ensure all required data is provided
        if (!userId || !cardNumber || !cardholderName || !expirationDate || !cvv || !creditLimit || currentBalance === undefined) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Add the new credit card to the database and await its result
        const newCreditCard = await connectDB.addCreditCard({
            userId,
            cardNumber,
            cardholderName,
            expirationDate,
            cvv,
            creditLimit,
            currentBalance
        });

        // Respond with a success message and the ID of the newly created credit card
        res.status(201).json({
            message: "Credit card added successfully",
            creditCardId: newCreditCard._id
        });
    } catch (error) {
        // Log the error and respond with a server error message
        console.error("Error adding credit card:", error);
        res.status(500).json({ error: "Error adding credit card" });
    }
};



const updateCreditCard = async (req, res) => {
    try {
        const id = req.params.id;
        const { cardNumber, cardholderName, expirationDate, cvv, creditLimit, currentBalance } = req.body;

        // Validate input fields to ensure all required data is provided
        if (!cardNumber || !cardholderName || !expirationDate || !cvv || !creditLimit || currentBalance === undefined) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Update the credit card in the database and await its result
        const updatedCreditCard = await connectDB.updateCreditCard(id, {
            cardNumber,
            cardholderName,
            expirationDate,
            cvv,
            creditLimit,
            currentBalance
        });

        // Check if the update was successful or if the credit card was not found
        if (!updatedCreditCard) {
            return res.status(404).json({ error: "Credit card not found or update failed" });
        }

        // Respond with a success message and the updated credit card details
        res.status(200).json({ message: "Credit card updated successfully", updatedCreditCard });
    } catch (error) {
        // Log the error and respond with a server error message
        console.error("Error updating credit card:", error);
        res.status(500).json({ error: "Error updating credit card" });
    }
};



const deleteCreditCard = async (req, res) => {
    try {
        const id = req.params.id;

        // Validate the ID format
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        // Attempt to delete the credit card from the database
        const result = await connectDB.deleteCreditCard(id);

        // Check if any document was deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Credit card not found" });
        }

        // Respond with no content status for successful deletion
        res.status(204).send();
    } catch (error) {
        // Log the error and respond with a server error message
        console.error("Error deleting credit card:", error);
        res.status(500).json({ error: "Error deleting credit card", details: error.message });
    }
};
// ###########################
// CONTROLLER FUNCTIONS FOR DEBIT CARDS
// ###########################


const getAllDebitCards = async (req, res) => {
    try {
        const userId = req.params.userId;
        const debitCards = await connectDB.getAllDebitCards(userId);
        res.json(debitCards);
    } catch (error) {
        console.error("Error fetching all debit cards:", error);
        res.status(500).json({ error: "Error fetching debit cards" });
    }
};



const addDebitCard = async (req, res) => {
    try {
        const { userId, cardNumber, cardholderName, expirationDate, accountBalance } = req.body;

        // Validate input fields to ensure all required data is provided
        if (!userId || !cardNumber || !cardholderName || !expirationDate || accountBalance === undefined) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Add the new debit card to the database and await its result
        const newDebitCard = await connectDB.addDebitCard({
            userId,
            cardNumber,
            cardholderName,
            expirationDate,
            accountBalance
        });

        // Respond with a success message and the ID of the newly created debit card
        res.status(201).json({
            message: "Debit card added successfully",
            debitCardId: newDebitCard._id
        });
    } catch (error) {
        // Log the error and respond with a server error message
        console.error("Error adding debit card:", error);
        res.status(500).json({ error: "Error adding debit card" });
    }
};



const updateDebitCard = async (req, res) => {
    try {
        const id = req.params.id;
        const { cardNumber, cardholderName, expirationDate, accountBalance } = req.body;

        // Validate input fields to ensure all required data is provided
        if (!cardNumber || !cardholderName || !expirationDate || accountBalance === undefined) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Update the debit card in the database and await its result
        const updatedDebitCard = await connectDB.updateDebitCard(id, {
            cardNumber,
            cardholderName,
            expirationDate,
            accountBalance
        });

        // Check if the update was successful or if the debit card was not found
        if (!updatedDebitCard) {
            return res.status(404).json({ error: "Debit card not found or update failed" });
        }

        // Respond with a success message and the updated debit card details
        res.status(200).json({ message: "Debit card updated successfully", updatedDebitCard });
    } catch (error) {
        // Log the error and respond with a server error message
        console.error("Error updating debit card:", error);
        res.status(500).json({ error: "Error updating debit card" });
    }
};


const deleteDebitCard = async (req, res) => {
    try {
        const id = req.params.id;

        // Validate the ID format
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        // Attempt to delete the debit card from the database
        const result = await connectDB.deleteDebitCard(id);

        // Check if any document was deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Debit card not found" });
        }

        // Respond with no content status for successful deletion
        res.status(204).send();
    } catch (error) {
        // Log the error and respond with a server error message
        console.error("Error deleting debit card:", error);
        res.status(500).json({ error: "Error deleting debit card", details: error.message });
    }
};

module.exports = {
    welcome,
    getAllIncome,
    addIncome,
    updateIncome,
    deleteIncome,
    getAllExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getAllCreditCards,
    addCreditCard,
    updateCreditCard,
    deleteCreditCard,
    getAllDebitCards,
    addDebitCard,
    updateDebitCard,
    deleteDebitCard
};