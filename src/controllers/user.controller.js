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
    const { nickName } = req.body;
    const newUser = await User.create({
        nickName
    });
    res.status(201).json(newUser);
};


const updateUser = async (req, res) => {
    const id = req.params.id;
    const { nickName } = req.body;
    const useUpdate = await User.update({
        nickName
    }, {
        where: {id}
        }
    )

   res.status(200).json(useUpdate);
}


const deleteUser = async (req, res) => {
    const id = req.params.id;
    await User.destroy({
        where: {id}
    });
    res.status(204).json({message: 'Comentario eliminado'});
}



module.exports = {getUser, getUserById,createUser,updateUser,deleteUser}
