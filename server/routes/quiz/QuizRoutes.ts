import express, { Request, Response, NextFunction } from 'express';
import { container } from '../../di/container';
import { TOKENS } from '../../di/tokens';

const router = express.Router();
const quizService = container.get(TOKENS.quizService);

// Create quiz score
router.post("/create-quiz-score", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { quizId, userId, title, score, attemptedQuestions, totalQuestions } = req.body;

        if (!quizId || !userId || !title || score === undefined || attemptedQuestions === undefined || totalQuestions === undefined) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        const quizScore = await quizService.createQuizScore(quizId, userId, title, score, attemptedQuestions, totalQuestions);
        res.status(201).json({ message: "Quiz score created successfully", quizScore });

    } catch (error) {
        next(error); 
    }
});

// Get quiz scores by user ID
router.get("/quiz-scores/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }

        const quizScores = await quizService.getQuizScoresByUserId(userId);
        res.status(200).json({ quizScores });
        

    } catch (error) {
        next(error);
    }
});

// Get quiz by quiz ID
router.get("/get-quiz/:quizId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { quizId } = req.params;

        if (!quizId) {
            res.status(400).json({ message: "Quiz ID is required" });
            return;
        }

        const result = await quizService.getQuizByQuizId(quizId);

        if (!result.quiz) {
            res.status(404).json({ message: "Quiz not found" });
            return;
        }

        res.status(200).json({
            quiz: {
                id: result.quiz.id,
                title: result.quiz.title,
                description: result.quiz.description,
                totalQuestions: result.quiz.totalQuestions
            },
            questions: result.questions
        });

    } catch (error) {
        next(error);
    }
});

router.post("/create-quiz", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, totalQuestions, questions } = req.body;

        if (!title || !description || totalQuestions === undefined || !Array.isArray(questions) || questions.length === 0) {
            res.status(400).json({ message: "All fields are required and questions must be an array." });
            return;
        }

        const result = await quizService.createQuiz(title, description, totalQuestions, questions);

        res.status(201).json({ message: "Quiz created successfully", quiz: result.quiz, questions: result.questions });
    } catch (error) {
        next(error);
    }
});

router.get("/get-all-quizzes", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const quizzes = await quizService.getAllQuizzes();
        res.status(200).json(quizzes);
    } catch (error) {
        next(error);
    }
});


export default router;
