import {cities, healthCarePlaceType, reportType, roles} from './Data'
import UserRole from "../../Model/UserRole";
import {adminUser} from './Data'
import AdminUser from "../../Model/AdminUser";
import City from "../../Model/City";
import UserReport from "../../Model/UserReport";
import HealthCarePlaceType from "../../Model/HealthCarePlaceType";
import UserReportType from "../../Model/UserReportType";

//roles
const InsertRoles = () => {
    UserRole.insertMany(roles).then(r => {
        console.log("User roles created successfully")
    }).catch(err=>{
        console.log(err, 'Err Found in User Roles. Please Verify !!')
    })
}

//admin user
const InsertAdminUser = async () => {
    const role = await UserRole.findOne({name: 'Super Admin'})
    // @ts-ignore
    adminUser['role_id'] = role._id

    console.log(adminUser)

    AdminUser.create(adminUser).then(r => {
        console.log('User Created Successfully')
    }).catch(err=>{
        console.log(err, 'Err Found in Admin User. Please Verify !!')
    })
}

//city
const InsertCities = ( ) => {
    City.insertMany(cities).then(r=> {
        console.log('Cities added successfully')
    }).catch(err => {
        console.log(err, 'Err Found in City. Please Verify !!')
    })
}

//report type
const InsertReportType = () => {
    UserReportType.insertMany(reportType).then(r=>{
        console.log("User Report added successfully")
    }).catch(err => {
        console.log(err, 'Err Found in User Report Type. Please Verify !!')
    })
}

//health care place type
const InsertHealthCarePlaceType = () => {
    HealthCarePlaceType.insertMany(healthCarePlaceType).then(r => {
        console.log("Health Care Places Type added successfully")
    }).catch(err => {
        console.log(err, 'Err Found in Health Care Places Type. Please Verify !!')
    })
}

//factory insert
export const RunFactory = () => {
    InsertRoles()
    InsertCities()
    InsertReportType()
    InsertHealthCarePlaceType()
    setTimeout(()=>{
        InsertAdminUser().then(r=>{})
    },1000)
}
