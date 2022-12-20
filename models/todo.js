// models/todo.js
"use strict";
const { Model ,Op} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      const item1=await Todo.overdue();
      const todo1=item1.map(todos => todos.displayableString()).join("\n");
      console.log(todo1);
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const items2=await Todo.dueToday();
      const todo2=items2.map(todos => todos.displayableString()).join("\n");
      console.log(todo2);
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const items3=await Todo.dueLater();
      const todo3=items3.map(todos => todos.displayableString()).join("\n");
      console.log(todo3);
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      const todaydate=new Date();
      return Todo.findAll({
        where:{
          dueDate:{
          [Op.lt]: todaydate,
          },
        },
        order:[
          ['id','ASC']
        ],
      });
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const todaydate=new Date();
      return Todo.findAll({
        where:{
          dueDate:{
            [Op.eq]:todaydate,
          },
        },
        order:[
          ['id','ASC']
        ],
      });
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const todaydate=new Date();
      return Todo.findAll({
        where:{
          dueDate:{
            [Op.gt]:todaydate,
          },
        },
        order:[
          ['id','ASC']
        ],
      });
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      return Todo.update({completed: true },{
        where:{
          id:id,
        },
      });
    }

    displayableString() {
      const todaydate=new Date().toLocaleDateString("en-CA");
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate ==todaydate ? '' : this.dueDate}`.trim();
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};