import { ref, computed } from 'vue'

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  category: string
  description: string
}

const events = ref<Event[]>([
  { 
    id: 1, 
    title: 'Festival de Danza en Oaxaca', 
    date: new Date().toISOString().split('T')[0], 
    time: '19:00', 
    location: 'Oaxaca', 
    category: 'Cultural', 
    description: 'Festival anual de danza tradicional' 
  },
  { 
    id: 2, 
    title: 'Concierto de Música Tradicional', 
    date: new Date(new Date().getTime() + 86400000).toISOString().split('T')[0], 
    time: '20:30', 
    location: 'Ciudad de México', 
    category: 'Música', 
    description: 'Concierto de grupos locales' 
  },
  { 
    id: 3, 
    title: 'Exposición de Arte Moderno', 
    date: new Date().toISOString().split('T')[0], 
    time: '10:00', 
    location: 'Guadalajara', 
    category: 'Arte', 
    description: 'Galería abierta con artistas emergentes' 
  },
  { 
    id: 4, 
    title: 'Mercado Artesanal', 
    date: new Date(new Date().getTime() + 86400000).toISOString().split('T')[0], 
    time: '08:00', 
    location: 'Puebla', 
    category: 'Mercado', 
    description: 'Venta de artesanías locales' 
  }
])

const eventFilter = ref('hoy')
let idCounter = events.value.length + 1

export const useEvents = () => {
  const isToday = (date: Date) => {
    const today = new Date()
    return date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
  }

  const isTomorrow = (date: Date) => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return date.getFullYear() === tomorrow.getFullYear() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getDate() === tomorrow.getDate()
  }

  const filteredEvents = computed(() => {
    if (eventFilter.value === 'hoy') {
      return events.value.filter(ev => {
        const evDate = new Date(ev.date + 'T00:00')
        return isToday(evDate)
      })
    } else if (eventFilter.value === 'mañana') {
      return events.value.filter(ev => {
        const evDate = new Date(ev.date + 'T00:00')
        return isTomorrow(evDate)
      })
    } else {
      return [...events.value]
    }
  })

  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      id: idCounter++,
      ...eventData
    }
    events.value.push(newEvent)
  }

  const renderCalendar = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startWeekDay = firstDay.getDay()

    const eventsByDate: { [key: string]: Event[] } = {}
    events.value.forEach(ev => {
      if (ev.date.startsWith(year + '-' + ((month + 1) < 10 ? '0' : '') + (month + 1))) {
        if (!eventsByDate[ev.date]) {
          eventsByDate[ev.date] = []
        }
        eventsByDate[ev.date].push(ev)
      }
    })

    let html = '<table style="width: 100%; border-collapse: collapse;">'
    
    // Header
    html += '<thead><tr>'
    const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    weekDays.forEach(day => {
      html += `<th style="border: 1px solid #cbd5e1; text-align: center; padding: 0.7rem 0.5rem; background: #e0e7ff; font-weight: 600; color: #374151;">${day}</th>`
    })
    html += '</tr></thead>'

    // Body
    html += '<tbody>'
    let currentDay = 1
    let done = false
    let weekCount = 0

    while (!done && weekCount < 6) {
      html += '<tr>'
      for (let i = 0; i < 7; i++) {
        html += '<td style="border: 1px solid #cbd5e1; text-align: center; padding: 0.7rem 0.5rem; height: 100px; vertical-align: top; position: relative;">'
        
        if ((weekCount === 0 && i < startWeekDay) || currentDay > daysInMonth) {
          html += '&nbsp;'
        } else {
          const dateStr = year + '-' + ((month + 1) < 10 ? '0' : '') + (month + 1) + '-' + (currentDay < 10 ? '0' : '') + currentDay
          const dayEvents = eventsByDate[dateStr] || []

          html += `<div style="position: absolute; top: 4px; right: 6px; font-size: 0.8rem; color: #6b7280; font-weight: 600;">${currentDay}</div>`
          
          dayEvents.forEach(ev => {
            html += `<span style="display: block; margin-top: 18px; background: #2563eb; color: white; font-size: 0.75rem; border-radius: 0.5rem; padding: 2px 6px; max-width: 90%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; cursor: default;" title="${ev.title}\n${ev.time} - ${ev.location}\n${ev.description}">${ev.title}</span>`
          })

          currentDay++
        }
        html += '</td>'
      }
      html += '</tr>'
      weekCount++
      if (currentDay > daysInMonth) {
        done = true
      }
    }
    html += '</tbody></table>'

    return html
  }

  return {
    events,
    eventFilter,
    filteredEvents,
    addEvent,
    renderCalendar
  }
}