import express, {Request, Response} from "express";
import UserController from "../../Controller/UserController";
// @ts-ignore
import catchAsync from '../../Utils/Handle'
import {UserMiddleware} from "./../../Validators/UserValidators";
import {AuthenticationMiddleware} from "../../Middleware/AuthenticationMiddleware";
import UserRoleController from "../../Controller/UserRoleController";
import CityController from "../../Controller/CityController";
import FaqController from "../../Controller/FaqController";
import HealthCarePlaceController from "../../Controller/HealthCarePlaceController";
import HealthCarePlaceTypeController from "../../Controller/HealthCarePlaceTypeController";
import PageController from "../../Controller/PageController";
import PushNotificationController from "../../Controller/PushNotificationController";
import UserReportController from "../../Controller/UserReportController";
import UserReportTypeController from "../../Controller/UserReportTypeController";

const router = express.Router()

router.get('/check', (req: Request, res: Response)=> {
    // @ts-ignore
    res.send("<h1>Hello World</h1>")
})

// router.post('/user/sign-up', UserController.signUp)
router.post('/user/sign-in', UserController.signIn)

router.use(AuthenticationMiddleware)

router.post('/user-patient', UserController.createPatientUser)
router.post('/user-admin', UserController.createAdminUser)
router.get('/user', UserController.getAll)
router.get('/user/:id', catchAsync(UserController.getById))
router.get('/user/:cnic/get-family', UserController.getFamily)

//roles
router.get('/role', UserRoleController.getAll)
router.get('/role/:id', UserRoleController.getById)
router.post('/role',UserRoleController.create)
router.put('/role/:id',UserRoleController.update)
router.delete('/role/:id',UserRoleController.delete)

//city
router.get('/city', CityController.getAll)
router.get('/city/:id', CityController.getById)
router.post('/city',CityController.create)
router.put('/city/:id',CityController.update)
router.delete('/city/:id',CityController.delete)

//Faqs
router.get('/faq', FaqController.getAll)
router.get('/faq/:id', FaqController.getById)
router.post('/faq',FaqController.create)
router.put('/faq/:id',FaqController.update)
router.delete('/faq/:id',FaqController.delete)

//Health Care Places
router.get('/business', HealthCarePlaceController.getAll)
router.get('/business/:id', HealthCarePlaceController.getById)
router.post('/business',HealthCarePlaceController.create)
router.put('/business/:id',HealthCarePlaceController.update)
router.delete('/business/:id',HealthCarePlaceController.delete)

//Health Care Places
router.get('/business-type', HealthCarePlaceTypeController.getAll)
router.get('/business-type/:id', HealthCarePlaceTypeController.getById)
router.post('/business-type',HealthCarePlaceTypeController.create)
router.put('/business-type/:id',HealthCarePlaceTypeController.update)
router.delete('/business-type/:id',HealthCarePlaceTypeController.delete)

//Health Care Places
router.get('/page', PageController.getAll)
router.get('/page/:id', PageController.getById)
router.post('/page',PageController.create)
router.put('/page/:id',PageController.update)
router.delete('/page/:id',PageController.delete)

//Push Notification
router.get('/push-notification', PushNotificationController.getAll)
router.get('/push-notification/:id', PushNotificationController.getById)
router.post('/push-notification',PushNotificationController.create)
router.put('/push-notification/:id',PushNotificationController.update)
router.delete('/push-notification/:id',PushNotificationController.delete)

//user report
router.get('/user/reports', UserReportController.getAll)
router.get('/user/reports/:id', UserReportController.getById)
router.post('/user/reports',UserReportController.create)
router.put('/user/reports/:id',UserReportController.update)
router.delete('/user/reports/:id',UserReportController.delete)

//user report
router.get('/user/report-types', UserReportTypeController.getAll)
router.get('/user/report-types/:id', UserReportTypeController.getById)
router.post('/user/report-types',UserReportTypeController.create)
router.put('/user/report-types/:id',UserReportTypeController.update)
router.delete('/user/report-types/:id',UserReportTypeController.delete)

export default router
