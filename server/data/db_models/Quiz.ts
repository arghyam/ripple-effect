import { DataTypes, Model, Optional, Sequelize } from "sequelize";


interface QuizAttributes {
    id: string;
    title: string;
    description: string;
    totalQuestions: number;
    
}

interface QuizCreationAttributes extends Optional<QuizAttributes, 'id'> { }

export class Quiz extends Model<QuizAttributes, QuizCreationAttributes> {
    declare id: string;
    declare title: string;
    declare description: string;
    declare totalQuestions: number;

    public readonly createdAt!: Date;
}

export function initQuiz(sequelize: Sequelize) {
    Quiz.init(
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            totalQuestions: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize: sequelize,
            tableName: 'ripple_quizzes',
            timestamps: true,
        }
    ).sync({
        alter: true,
    });
}
