require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient(process.env.URI);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error("Could not connect to MongoDB", e);
        throw e;
    }
}

// Income CRUD operations
async function getAllIncome(userId) {
    try {
        const income = await client.db("financebuddy").collection("income").find({ userId }).toArray();
        return income;
    } catch (e) {
        console.error("Error fetching income:", e);
        throw e;
    }
}

async function addIncome(newIncome) {
    try {
        const result = await client.db("financebuddy").collection("income").insertOne(newIncome);
        return { _id: result.insertedId, ...newIncome };
    } catch (e) {
        console.error("Error adding new income:", e);
        throw e;
    }
}

async function updateIncome(id, updatedIncome) {
    try {
        const result = await client.db("financebuddy").collection("income")
            .updateOne({ _id: new ObjectId(id) }, { $set: updatedIncome });
        if (result.matchedCount === 0) throw new Error('Income not found');
        return { _id: id, ...updatedIncome };
    } catch (e) {
        console.error("Error updating income:", e);
        throw e;
    }
}

async function deleteIncome(id) {
    try {
        return await client.db("financebuddy").collection("income").deleteOne({ _id: new ObjectId(id) });
    } catch (e) {
        console.error("Error deleting income:", e);
        throw e;
    }
}

// Expense CRUD operations
async function getAllExpenses(userId) {
    try {
        const expenses = await client.db("financebuddy").collection("expenses").find({ userId }).toArray();
        return expenses;
    } catch (e) {
        console.error("Error fetching expenses:", e);
        throw e;
    }
}

async function addExpense(newExpense) {
    try {
        const result = await client.db("financebuddy").collection("expenses").insertOne({
            ...newExpense,
            createdAt: new Date()  // Add a timestamp for when the expense was created
        });
        
        // Fetch the newly inserted document
        const insertedExpense = await client.db("financebuddy").collection("expenses")
            .findOne({ _id: result.insertedId });
        
        return insertedExpense;
    } catch (e) {
        console.error("Error adding new expense:", e.message, e.stack);
        throw e;
    }
}


async function updateExpense(id, updatedExpense) {
    try {
        const result = await client.db("financebuddy").collection("expenses")
            .updateOne({ _id: new ObjectId(id) }, { $set: updatedExpense });
        if (result.matchedCount === 0) throw new Error('Expense not found');
        return { _id: id, ...updatedExpense };
    } catch (e) {
        console.error("Error updating expense:", e);
        throw e;
    }
}

async function deleteExpense(id) {
    try {
        return await client.db("financebuddy").collection("expenses").deleteOne({ _id: new ObjectId(id) });
    } catch (e) {
        console.error("Error deleting expense:", e);
        throw e;
    }
}

// Credit Card CRUD operations
async function getAllCreditCards(userId) {
    try {
        const creditCards = await client.db("financebuddy").collection("creditcard").find({ userId }).toArray();
        return creditCards;
    } catch (e) {
        console.error("Error fetching credit cards:", e);
        throw e;
    }
}

async function addCreditCard(newCreditCard) {
    try {
        const result = await client.db("financebuddy").collection("creidtcard").insertOne(newCreditCard);
        return { _id: result.insertedId, ...newCreditCard };
    } catch (e) {
        console.error("Error adding new credit card:", e);
        throw e;
    }
}

async function updateCreditCard(id, updatedCreditCard) {
    try {
        const result = await client.db("financebuddy").collection("creditcard")
            .updateOne({ _id: new ObjectId(id) }, { $set: updatedCreditCard });
        if (result.matchedCount === 0) throw new Error('Credit card not found');
        return { _id: id, ...updatedCreditCard };
    } catch (e) {
        console.error("Error updating credit card:", e);
        throw e;
    }
}

async function deleteCreditCard(id) {
    try {
        return await client.db("financebuddy").collection("creditcard").deleteOne({ _id: new ObjectId(id) });
    } catch (e) {
        console.error("Error deleting credit card:", e);
        throw e;
    }
}

// Debit Card CRUD operations
async function getAllDebitCards(userId) {
    try {
        const debitCards = await client.db("financebuddy").collection("debitcard").find({ userId }).toArray();
        return debitCards;
    } catch (e) {
        console.error("Error fetching debit cards:", e);
        throw e;
    }
}

async function addDebitCard(newDebitCard) {
    try {
        const result = await client.db("financebuddy").collection("debitcard").insertOne(newDebitCard);
        return { _id: result.insertedId, ...newDebitCard };
    } catch (e) {
        console.error("Error adding new debit card:", e);
        throw e;
    }
}

async function updateDebitCard(id, updatedDebitCard) {
    try {
        const result = await client.db("financebuddy").collection("debitcard")
            .updateOne({ _id: new ObjectId(id) }, { $set: updatedDebitCard });
        
       if (result.matchedCount === 0) throw new Error('Debit card not found');
       return { _id: id, ...updatedDebitCard };
   } catch (e) {
       console.error("Error updating debit card:", e);
       throw e;
   }
}

async function deleteDebitCard(id) {
   try {
       return await client.db("financebuddy").collection("debitcard").deleteOne({ _id: new ObjectId(id) });
   } catch (e) {
       console.error("Error deleting debit card:", e);
       throw e;
   }
}

module.exports = {
   connectToMongoDB,
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