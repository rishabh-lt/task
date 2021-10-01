module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define("User",{
        //column
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        sno: {
            type: DataTypes.INTEGER,
        }
    })

    return User
}