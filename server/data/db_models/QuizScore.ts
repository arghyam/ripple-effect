import { DataTypes, Model, Optional, Sequelize } from "sequelize"


interface QuizScoreAttributes {
    id: string
    quizId: string
    userId: string
    title: string
    score: number
    attemptedQuestions: number
    totalQuestions: number
};

interface QuizScoreCreationAttributes extends Optional<QuizScoreAttributes, 'id'> { }

export class QuizScore extends Model<QuizScoreAttributes, QuizScoreCreationAttributes> {
  declare id: string
  declare quizId: string
  declare userId: string
  declare title: string
  declare score: string
  declare attemptedQuestions: number
  declare totalQuestions: number

  public readonly createdAt!: Date
    
}

export function initQuizScore(sequelize: Sequelize) {
    QuizScore.init(
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            quizId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            score: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            attemptedQuestions: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            totalQuestions: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, 
        {
            sequelize: sequelize,
            tableName: 'ripple_quiz_scores',
            timestamps: true
        }
    ).sync({
        alter: true
      });
}