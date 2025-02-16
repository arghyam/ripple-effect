import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Quiz } from "./Quiz";


interface QuestionAttributes {
    id: string;
    quizId: string;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    answer: string;
}

interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'id'> { }

export class Question extends Model<QuestionAttributes, QuestionCreationAttributes> {
    declare id: string;
    declare quizId: string;
    declare question: string;
    declare optionA: string;
    declare optionB: string;
    declare optionC: string;
    declare optionD: string;
    declare answer: string;

    public readonly createdAt!: Date;
}

export function initQuestion(sequelize: Sequelize) {
    Question.init(
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            quizId: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: Quiz,
                    key: 'id',
                },
            },
            question: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            optionA: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            optionB: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            optionC: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            optionD: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            answer: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize: sequelize,
            tableName: 'ripple_quiz_questions',
            timestamps: true,
        }
    ).sync({ alter: true });
}