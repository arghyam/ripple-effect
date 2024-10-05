import express from 'express'
import { container } from '../../di/container'
import { TOKENS } from '../../di/tokens'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { logger } from '../..'

const router = express.Router()

const profileService = container.get(TOKENS.profileService)


const diskStorage = multer.diskStorage(
  {
    destination: (req, file, cb) => {
      cb(null, path.join('./././', '/temp'))
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  }
)
const upload = multer(
  {
    storage: diskStorage

  }
)




router.post('/upload-profile-photo', upload.single("profile-photo-file"), async (req, res) => {
  try {

    const tempPath = req.file?.path
    const originalFilename = req.file?.originalname

    const userId = req.query.userId

    if (userId == undefined) {
      throw Error('UserId not found in query')
    }

    if (originalFilename == undefined || tempPath == undefined) {
      throw Error('Corrupted File found')
    }



    const finalDir = path.join('./././', '/uploads')
    const finalPath = path.join(finalDir, userId + '.png')


    fs.rename(tempPath, finalPath, (err) => {
      if (err) {
        logger.error('Error moving file:', err)
        res.status(500).json(
          {
            status_code: 500,
            photo_url: null,
            message: "Photo upload failed"
          }
        )
      } else {

        res.status(200).json(
          {
            status_code: 200,
            photo_url: 'profile-photo/' + userId + '.png',
            message: "Photo uploaded successfully"
          }
        )
      }
    })


  } catch (error) {
    //handle other route excetions
  }
})

router.get('/get-profile', async (req, res, next) => {
  try {

    const userId = req.query.userId as string
    const result = await profileService.getProfileDetails(userId)

    res.status(200).json(
      {
        status_code: 200,
        profile_details: result,
        message: "profile details fetched successfully"
      }
    )



  } catch (err) {
    next(err)


  }
})

router.post('/update-profile', async (req, res, next) => {
  try {

    const userId = req.query.userId as string
    const request = req.body as UpdateProfileReq

    const result = await profileService.updateProfile(userId, request)

    res.status(200).json(
      {
        status_code: 200,
        result: result,
        message: "profile updated successfully"
      }
    )



  } catch (err) {

    next(err)

  }
})

export default router
