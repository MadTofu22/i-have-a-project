const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const  dayjs = require('dayjs')

const weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)
const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)


router.get('/', async (req, res) => {
    if (req.isAuthenticated) {
        console.log(req.body, req.user);
        
        const filterBySoftware = `SELECT * FROM "desingers"
                                    JOIN "designer_software_join ON
                                        "designer"."id" = "designer_software_join"."designer_id"
                                    WHERE "software_id" = $1`

        const getBaseAvailability = `SELECT "id", "availability_hours", "weekend_availability" FROM "designers"
                                        WHERE "id" = $1`
        const getEventsForDesigner = `SELECT * FROM "designer_calendar_item"
                                        WHERE "designer_id" = $1`

        const start = req.body.start
            let startWeek = start.week()
            let startDayOfWeek = dayjs(start).day()

        const due_date = req.body.due_date
            let dueDateWeek = due_date.week()
            let dueDateDayOfWeek = dayjs(due_date).day()
        
        const searchWeekSpan = dueDateWeek - startWeek
        const availableDesigners = [];


        const checkAvail = async (designerID) => {
            const baseAvailres = await connection.query(getBaseAvailability, [designerID])
            const eventsRes = await connection.query(getEventsForDesigner, [designerID])
            let events = eventsRes.rows
            let baseAvail = baseAvailres.rows[0]
            let dailyAvail = 0
            let totalWorkingDays = 0

            if (baseAvail.weekend_availability) {
                dailyAvail = baseAvail.availability_hours / 7
                daysWorkingPerWeek = 7
            } else {
                dailyAvail = baseAvail.availability_hours / 5
                daysWorkingPerWeek = 5
            }
            // loop through length of project and find number of days
            for (let week = 0; week <= searchWeekSpan; week++) {
                if (baseAvail.weekend_availability) {
                    for (let dayofWeek = startDayOfWeek; index <= 6; dayofWeek++) {
                        if (week === searchWeekSpan && week <= dueDateDayOfWeek) {
                            break;
                        } else {
                            totalWorkingDays += 1
                        }
                    } 
                    break;
                } else {
                    for (let index = startDayOfWeek; index <= 6; index++) {
                        let isNotWeekend = index > 0 || index < 6
                        if (week === searchWeekSpan && week <= dueDateDayOfWeek) {
                            break;
                        } else if (isNotWeekend) {
                            totalWorkingDays += 1
                        }
                    } 
                    break;
                }
            }
            let designerAvailWithinProj = totalWorkingDays * dailyAvail
            for (const event of events) {
                if (dayjs(event.start).isBetween(start, due_date)) {
                    designerAvailWithinProj -= event.hoursCommitted
                }
            }
            return designerAvailWithinProj
        }


        const connection = await pool.connect();
        try {
            await connection.query("BEGIN")
            const filteredBySoftware = await connection.query(filterBySoftware, [req.body.software_id])
            filteredBySoftware.forEach( ( designer) =>{
                if (checkAvail(designer.id) >= requested_hours) {
                    availableDesigners.push(designer)
                }
            }) 
            await connection.query('COMMIT')
            res.sendStatus(res.send(availableDesigners))
        } catch (error) {
            await connection.query('ROLLBACK')
            console.log(error);
            res.sendStatus(500)
        } finally {
            connection.release()
        }
    } else {
        res.sendStatus(403)
    }
});

module.exports = router;
