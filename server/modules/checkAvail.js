const  dayjs = require('dayjs')
const weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)
const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)

const checkAvailByDateAndEvents = async (start, due_date, baseAvail, events) => {

    /*
    start,
    end,
    baseAvail = {
        availability_hours: int,
        weekend_availability: boolean
    }
    events: [
        {
            start: date,
            hoursCommitted: int
        }
    ]
    */


    // calendar week of year
    const startWeek =  dayjs(start).week()
    const startDayOfWeek =  dayjs(start).day()
    const dueDateWeek = dayjs(due_date).week()
    const dueDateDayOfWeek =  dayjs(due_date).day()
    const searchWeekSpan = dueDateWeek - startWeek

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


module.exports = {checkAvailByDateAndEvents}