const { User } = require('../db/models');


const getUser = async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
};


const getUserById = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);

    res.status(200).json(user);
};

const createUser = async (req, res) => {
    try {
        const {nickName} = req.body;
        const newUser = await User.create({
            nickName
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error errors:', error.errors);
    }

};


const updateUser = async (req, res) => {
    const id = req.params.id;
    const { nickName } = req.body;
    const userUpdate = await User.update({
        nickName
    }, {
        where: {id}
        }
    )

   res.status(200).json(userUpdate);
}


const deleteUser = async (req, res) => {
    const id = req.params.id;
    await User.destroy({
        where: {id}
    });
    res.status(204).json({message: 'Usuario eliminado'});
}



module.exports = {getUser, getUserById,createUser,updateUser,deleteUser}
