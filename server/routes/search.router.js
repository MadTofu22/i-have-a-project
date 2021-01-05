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
        console.log(req.body, req.user);
        
        const filterBySoftware = `SELECT * FROM "designers"
                                    JOIN "designer_software_join" ON
                                        "designers"."id" = "designer_software_join"."designer_id"
                                    WHERE "software_id" = $1`

        const getBaseAvailability = `SELECT "id", "availability_hours", "weekend_availability" FROM "designers"
                                        WHERE "id" = $1`
        const getEventsForDesigner = `SELECT * FROM "designer_calendar_item"
                                        WHERE "designer_id" = $1`

        const start = req.body.start
            let startWeek =  dayjs(start).week()
            let startDayOfWeek =  dayjs(start).day()
        

        const due_date = req.body.due_date
            let dueDateWeek =  dayjs(due_date).week()
            let dueDateDayOfWeek = dayjs(due_date).day()
        
        const searchWeekSpan = dueDateWeek - startWeek
            console.log(searchWeekSpan, 'span');
            
        let availableDesigners = [];

        console.log('start:', start);
        console.log('start day', startDayOfWeek);
        console.log('start week:', startWeek);
        console.log('due:', due_date);
        console.log('dueweek:', dueDateWeek);
        console.log('due week', dueDateDayOfWeek);


        const checkAvail = async (designerID) => {            
            const baseAvailres = await connection.query(getBaseAvailability, [designerID])
            const eventsRes = await connection.query(getEventsForDesigner, [designerID])
            let events = eventsRes.rows
                
            let baseAvail = await baseAvailres.rows[0]
                console.log(baseAvail, 'obj');
            let dailyAvail = 0
            let totalWorkingDays = 0
                
            try {
                
            if (baseAvail.weekend_availability) {
                dailyAvail = await baseAvail.availability_hours / 7
                daysWorkingPerWeek =  7
            } else {
                dailyAvail = await baseAvail.availability_hours / 5
                daysWorkingPerWeek = 5
            }
            console.log(baseAvail, 'obj');
            console.log(dailyAvail, 'Daily Avail');
            
            // loop through length of project and find number of days
            for (let week = 0; week <= searchWeekSpan; week++) {

                console.log(week,'weekcount');
                
                if (baseAvail.weekend_availability) {
                    for (let dayofWeek = startDayOfWeek; dayofWeek <= 6; dayofWeek++) {
                        if (week === searchWeekSpan && dayofWeek === dueDateDayOfWeek) {
                            break;
                        } else {
                            totalWorkingDays += 1
                        }
                    } 
                    break;
                } else {
                    console.log('no weekend avail');
                    
                    for (let dayofWeek = startDayOfWeek; dayofWeek <= 6; dayofWeek++) {
                        console.log('startday', dayofWeek, 'span', searchWeekSpan );
                        
                        let isNotWeekend = dayofWeek > 0 || dayofWeek < 6
                        if (week === searchWeekSpan && dayofWeek === dueDateDayOfWeek) {
                            totalWorkingDays += 1
                            break;
                        } else if (isNotWeekend) {
                            totalWorkingDays += 1
                            console.log(totalWorkingDays, 'daycount');
                        }
                    } 
                }
            }
            let designerAvailWithinProj = totalWorkingDays * dailyAvail
            
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
            const filteredBySoftware = await connection.query(filterBySoftware, [req.body.software])
            console.log(filteredBySoftware.rows);
            let designersWithSoftware = filteredBySoftware.rows
            for (const designer of designersWithSoftware) {
                const hours = await checkAvail(designer.designer_id)
                
                if (hours >= req.body.hoursCommitted) {
      
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
