const {StatusCodes} = require('http-status-codes')

const CustomError = require('../errors')

const User = require('../models/User')

const createUser = async (req, res)=>{
    const { name } = req.body;
    // console.log(req.body)
    const nameAlreadyExists = await User.findOne({ name });
    // console.log(name)
    if (nameAlreadyExists) {
        throw new CustomError.BadRequestError('User Name already exists');
    }

    // console.log(req.body)

    const user = await User.create(req.body);
    console.log(user)
    res.status(StatusCodes.CREATED).json({msg:"User created", details: user})
}

const getAllUsers = async(req, res)=>{
    const users = await User.find({}).populate('mealPlan')
    console.log(users)
    res.send({count: users.length, users: users})

}

const getSingleUser = async(req,res)=>{
    const { id: userId } = req.params;
    
    const user = await User.findOne({_id: userId}).populate('mealPlan');
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${userId}`);
      }
      res.status(StatusCodes.OK).json({ user })
}

const updateUser = async(req, res)=>{
    const { id: userId } = req.params;

  const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
    // option new: true returns the updated document instead of the original
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${userId}`);
  }
  res.status(StatusCodes.OK).json({"Updated user": user });
}

const deleteUser = async(req, res) =>{
    const {id: userId} = req.params;
    
    const user = await User.findOne({ _id: userId });
  
    if (!user) {
      throw new CustomError.NotFoundError(`No user with id : ${userId}`);
    }
  
    user.remove();
    res.status(StatusCodes.OK).json({ msg: 'success! user removed' });
}
module.exports = {createUser, getAllUsers, getSingleUser, updateUser, deleteUser}