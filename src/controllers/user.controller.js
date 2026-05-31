const { User, Comment,Post } = require('../db/models');


const getUsers = async (req, res) => {
    try{
        const users = await User.findAll();
        res.status(200).json(users);
    }catch (error) {
        res.status(500).json({message: 'Error al obtener los usuarios'});
    }
};


const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id,{
            include:[
                {
                    model: Comment,
                    as: 'comentarios'
                },
                {
                    model: Post,
                    as: 'posts',
                    attributes:['texto','fecha']
                },
                {
                    model: User,
                    as: 'followers',
                    attributes:['id', 'nickName']
                }
            ]
        });

        res.status(200).json(user);
    }catch (error) {
        res.status(500).json({message: `Error al obtener el usuario`});
    }
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
        res.status(500).json({message: 'Error al crear el usuario'});
    }

};


const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const {nickName} = req.body;
        const userUpdate = await User.update({
                nickName
            }, {
                where: {id}
            }
        )

        res.status(200).json(userUpdate);
    }catch (error) {
        res.status(500).json({message: 'Error al actualizar el usuario'});
    }
}


const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await User.destroy({
            where: {id}
        });
        res.status(204).json({message: 'Usuario eliminado'});
    }catch (error) {
        res.status(500).json({message: 'Error al eliminar el usuario'});
    }
}

const getCommentsByUserId = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({
            where: {id},
            include: {
                model: Comment,
                as: 'comentarios'
            }
        });
        res.status(200).json(user.comentarios);
    }catch (error) {
        res.status(500).json({message: 'Error al obtener los comentarios del usuario'});
    }
}

const getPostsByUserId = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({
            where: {id},
            include: {
                model: Post,
                as: 'posts',
                attributes:['id','texto','fecha']
            }
        });
        res.status(200).json(user.posts);
    }catch (error) {
        res.status(500).json({message: 'Error al obtener los posts del usuario'});
    }
}

const seguirUsuario = async (req, res) => {
    try {
        const myId = Number(req.params.id);
        const idToFollow = Number(req.params.idToFollow);
        const miUsuario = await User.findByPk(myId);
        const usuarioAseguir = await User.findByPk(idToFollow);
        await miUsuario.addFollowing(usuarioAseguir);

        res.status(200).json({message: 'Comenzaste a seguir a este usuario exitosamente'});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error', error: error.message});
    }

}


const dejarDeSeguirUsuario = async (req, res) => {
    try {
        const myId = Number(req.params.id);
        const idToUnfollow = Number(req.params.idToFollow);
        const miUsuario = await User.findByPk(myId);
        const usuarioADejarDeSeguir = await User.findByPk(idToUnfollow);
        await miUsuario.removeFollowing(usuarioADejarDeSeguir);

        res.status(200).json({message: 'Dejaste de seguir a este usuario exitosamente'});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error', error: error.message});
    }

}


module.exports = {getUsers,
    getUserById,
    getPostsByUserId,
    createUser,
    updateUser,
    deleteUser,
    seguirUsuario,
    dejarDeSeguirUsuario,
    getCommentsByUserId
}
