export default {
  convertPriceToRupiah (price, withPrefix = true) {
    if (price === null || price === undefined) {
      return
    }
    return withPrefix ? 'Rp' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  },

  convertEmptyValueWithDash (str) {
    return !str & str !== 0 & str !== '0' ? '-' : str
  },

  convertDateTimeZoneToDateTimeString (dateTime) {
    if (!dateTime) {
      return
    }

    const inputDate = new Date(dateTime);
    const formattedDate = `${inputDate.getDate().toString().padStart(2, '0')}/${(inputDate.getMonth() + 1).toString().padStart(2, '0')}/${inputDate.getFullYear()}`
    const formattedTime = `${inputDate.getHours().toString().padStart(2, '0')}:${inputDate.getMinutes().toString().padStart(2, '0')}`;
    
    const output = `pada ${formattedDate}, ${formattedTime}`;
    return output
  },

  getCurrentDate () {
    const date = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    
    return date.toLocaleDateString('in', options)
  },

  convertDateTimeZoneToDateTimeStringWib (dateTime) {
    if (!dateTime) {
      return
    }

    const inputDate = new Date(dateTime);
    const formattedDate = `${inputDate.getDate().toString().padStart(2, '0')}/${(inputDate.getMonth() + 1).toString().padStart(2, '0')}/${inputDate.getFullYear()}`
    const formattedTime = `${inputDate.getHours().toString().padStart(2, '0')}:${inputDate.getMinutes().toString().padStart(2, '0')}`;
    
    const output = `${formattedDate}, ${formattedTime} WIB`;
    return output
  },

  convertDateTimeZoneToDateString (dateTime) {
    if (!dateTime) {
      return
    }

    const inputDate = new Date(dateTime);
    const formattedDate = `${inputDate.getDate().toString().padStart(2, '0')}/${(inputDate.getMonth() + 1).toString().padStart(2, '0')}/${inputDate.getFullYear()}`
    
    const output = `${formattedDate}`;
    return output
  },

  convertDateToAge (date) {
    if (!date) {
      return
    }

    let today = new Date()
    let birthDate = new Date(date)
    let age = today.getFullYear() - birthDate.getFullYear()
    let monthDifference = today.getMonth() - birthDate.getMonth()
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return `(${age} tahun)`
  },

  fileToByteArray (file) {
    return new Promise((resolve, reject) => {
      try {
        let reader = new FileReader()
        let fileByteArray = []
        reader.readAsArrayBuffer(file)
        reader.onloadend = function (evt) {
          if (evt.target.readyState === FileReader.DONE) {
            let arrayBuffer = evt.target.result
            let array = new Uint8Array(arrayBuffer)
            for (let i = 0; i < array.length; i++) {
              fileByteArray.push(array[i])
            }
            resolve(fileByteArray)
          }
        }
      } catch (e) {
        reject(e)
      }
    })
  }
}
