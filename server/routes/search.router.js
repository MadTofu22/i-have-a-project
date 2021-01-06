const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const  dayjs = require('dayjs')

const weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)
const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)


router.post('/', async (req, res) => {
    if (req.isAuthenticated) {
        console.log('search', req.body);
        
        // first check to limit how many designers we check avail on 
        const filterBySoftware = `SELECT * FROM "designers"
                                    JOIN "designer_software_join" ON
                                        "designers"."id" = "designer_software_join"."designer_id"
                                    WHERE "software_id" = $1
                                        AND "proficient" = TRUE
                                        AND NOT "manager_id" = $2`
        // gets their normal work hours // and if weekend is included in that work time
        const getBaseAvailability = `SELECT "id", "availability_hours", "weekend_availability" FROM "designers"
                                        WHERE "id" = $1`
        // get all calendar events for a user
        const getEventsForDesigner = `SELECT * FROM "designer_calendar_item"
                                        WHERE "designer_id" = $1
                                            AND "available" = FALSE`
        // start date 
        const start = req.body.start
            // calendar week of year
            let startWeek =  dayjs(start).week()
            // calendar day of week
            let startDayOfWeek =  dayjs(start).day()
        
        // due date
        const due_date = req.body.due_date
            // calendar week due date
            let dueDateWeek =  dayjs(due_date).week()
            // calendar day of week end
            let dueDateDayOfWeek = dayjs(due_date).day()
        
        // how many weeks does the search span (0 means partial week)
        const searchWeekSpan = dueDateWeek - startWeek
        // initialize results array
        let availableDesigners = [];

        // console.log('start:', start);
        // console.log('start day', startDayOfWeek);
        // console.log('start week:', startWeek);
        // console.log('due:', due_date);
        // console.log('dueweek:', dueDateWeek);
        // console.log('due week', dueDateDayOfWeek);

        const checkAvail = async (designerID) => {            
            const baseAvailres = await connection.query(getBaseAvailability, [designerID])
            const eventsRes = await connection.query(getEventsForDesigner, [designerID])
            let events = eventsRes.rows
                
            let baseAvail = await baseAvailres.rows[0]
            let dailyAvail = 0
            let totalWorkingDays = 0
            
            // how many days does the designer work per week?
            try {
                
            if (baseAvail.weekend_availability) {
                dailyAvail = await baseAvail.availability_hours / 7
            } else {
                dailyAvail = await baseAvail.availability_hours / 5
            }
            
            // loop through length of project and find number of days the designer is working
            for (let week = 0; week <= searchWeekSpan; week++) {                
                if (baseAvail.weekend_availability) {
                    for (let dayofWeek = startDayOfWeek; dayofWeek <= 6; dayofWeek++) {
                        if (week === searchWeekSpan && dayofWeek === dueDateDayOfWeek) {
                            totalWorkingDays += 1
                            break;
                        } else {
                            totalWorkingDays += 1
                        }
                    } 
                    break;
                } else {                    
                    for (let dayofWeek = startDayOfWeek; dayofWeek <= 6; dayofWeek++) {
                        
                        let isNotWeekend = dayofWeek > 0 || dayofWeek < 6
                        if (week === searchWeekSpan && dayofWeek === dueDateDayOfWeek) {
                            totalWorkingDays += 1
                            break;
                        } else if (isNotWeekend) {
                            totalWorkingDays += 1
                        }
                    } 
                }
            }
            // how many total hours in the given time span do they normally have available
            console.log('base avail per week', baseAvail.availability_hours);
            
            console.log('days working', totalWorkingDays);
            console.log('daily Avail before events', dailyAvail);
            
            let designerAvailWithinProj = totalWorkingDays * dailyAvail
            
            // subtract calendar events that occur within the given time span
            for (const event of events) {
                if (dayjs(event.start).isBetween(start, due_date)) {
                    designerAvailWithinProj -= event.hoursCommitted
                }
            }
            console.log(designerID, 'has ', designerAvailWithinProj, 'hours avail within search param');
            return designerAvailWithinProj

            } catch (error) {
                console.log(error);
                
            } 
        }


        const connection = await pool.connect();
        try {
            await connection.query("BEGIN")
            // filter designers by software
            const filteredBySoftware = await connection.query(filterBySoftware, [req.body.software_id])
            let designersWithSoftware = filteredBySoftware.rows
            // loop through designers found and push any that are available to array
            for (const designer of designersWithSoftware) {
                const hours = await checkAvail(designer.designer_id)
                
                if (hours >= req.body.requested_hours) {
      
                    availableDesigners.push(designer)
                }
            }
            console.log('avail designers list', availableDesigners);
            
            await connection.query('COMMIT')
            
            res.send(availableDesigners)
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
