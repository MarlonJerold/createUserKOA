let users = []; 

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const createUser = (id, name, email) => ({
  id,
  name,
  email
});

const addUser = (usersList, user) => [...usersList, user];

const generateUserId = (usersList) => usersList.length + 1;

const isMissing = (value) => !value;
const isEmailValid = (email) => isValidEmail(email);

const validateInput = (name, email) => {
    const errors = [];
  
    if (isMissing(name) || isMissing(email)) {
      errors.push('Nome e email são obrigatórios');
    }
  
    if (email && !isEmailValid(email)) {
      errors.push('Email inválido');
    }
  
    return errors.length > 0 ? { errors } : null;
};
  
const createAndAddUser = (usersList, name, email) => {
    const newUserId = generateUserId(usersList);
    const newUser = createUser(newUserId, name, email);
    return addUser(usersList, newUser);
};

exports.createUserHandler = async (ctx) => {
    const { name, email } = ctx.request.body;
  
    const validationError = validateInput(name, email);
    if (validationError) {
      ctx.status = 400;
      ctx.body = validationError;
      return;
    }
  
    users = createAndAddUser(users, name, email);
  
    ctx.status = 201;
    ctx.body = { user: users[users.length - 1] }; 
};