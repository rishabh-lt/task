module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define("User",{
        
        //column
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        },
        task: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        status: {
           type: DataTypes.ENUM('active', 'completed', 'deleted'), 
           defaultValue: 'active' 
        }
    },
    {
      indexes :[
        {
          name: 'status-index',
          fields: ['status'],
        },
      ]
    }                      
 )
    return User
}
