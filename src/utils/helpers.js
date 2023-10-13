export default {
  convertPriceToRupiah (price) {
    if (!price) {
      return
    }
    return 'Rp' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  },

  convertWithEmptyValueDash (str) {
    return !str ? '-' : str
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

  convertDateTimeZoneToDateString (dateTime) {
    if (!dateTime) {
      return
    }

    const inputDate = new Date(dateTime);
    const formattedDate = `${inputDate.getDate().toString().padStart(2, '0')}/${(inputDate.getMonth() + 1).toString().padStart(2, '0')}/${inputDate.getFullYear()}`
    
    const output = `${formattedDate}`;
    return output
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
