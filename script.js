(function() {
   const input = document.querySelector('input')
   const btnWrapper = document.querySelector('.btn-wrapper')
   const btnPassword = document.querySelector('#btn-submit-password')

   const eyeButton = document.querySelector('.eye')
   const eyeIcon   = document.querySelector('#eye-icon')   

   eyeButton.onclick = () => {
      let inputType = input.getAttribute('type')
      
      if(inputType === 'password') {
         input.setAttribute('type', 'text')
         
         eyeIcon.classList.remove('fa-eye')
         eyeIcon.classList.add('fa-eye-slash')

      } else {
         input.setAttribute('type', 'password')

         eyeIcon.classList.remove('fa-eye-slash')
         eyeIcon.classList.add('fa-eye')
      }
   }

   input.onkeyup = function (e) {
      let value = e.target.value.toString()
      let passwordIsValid = validatePassword(value)

      if(!passwordIsValid) {
         btnWrapper.classList.remove('show')
         return
      }
      
      btnWrapper.classList.add('show')
   }

   const stepUpperCase   = document.querySelector('#step-uppercase')
   const stepLowerCase   = document.querySelector('#step-lowercase')
   const stepNumber      = document.querySelector('#step-number')
   const stepSpecialChar = document.querySelector('#step-special-char')
   const stepLength      = document.querySelector('#step-length')

   const validatePassword = value => {
      let allInputsAreOkay = true

      // Lower Case validation
      let valueUpperCase = value.toUpperCase()
      if(value === valueUpperCase) {
         allInputsAreOkay = false
         setStepUnChecked(stepLowerCase)
      } else {
         setStepChecked(stepLowerCase)
      }

      // Upper Case validation
      let valueLowerCase = value.toLowerCase()
      if(value === valueLowerCase) {
         allInputsAreOkay = false
         setStepUnChecked(stepUpperCase)
      } else {
         setStepChecked(stepUpperCase)
      }

      // Number validation
      let hasNumber = /\d/.test(value)
      if(!hasNumber) {
         allInputsAreOkay = false
         setStepUnChecked(stepNumber)
      } else {
         setStepChecked(stepNumber)
      }

      // Special Char validation
      let hasSpecialChar = /[$%@!-#&*(){}.,]/.test(value)
      if(!hasSpecialChar) {
         allInputsAreOkay = false
         setStepUnChecked(stepSpecialChar)
      } else {
         setStepChecked(stepSpecialChar)
      }

      // Length validation
      let valueLength = value.length
      if(valueLength < 8) {
         allInputsAreOkay = false
         setStepUnChecked(stepLength)
      } else {
         setStepChecked(stepLength)
      }

      return allInputsAreOkay
   }

   const setStepUnChecked = (stepElement) => {
      stepElement.classList.remove('is-valid')

      const elementIcon = stepElement.querySelector('i')
      elementIcon.classList.remove('fa-solid', 'fa-check')
      elementIcon.classList.add('fa-regular', 'fa-circle-dot')
   }

   const setStepChecked = (stepElement) => {
      stepElement.classList.add('is-valid')

      const elementIcon = stepElement.querySelector('i')
      elementIcon.classList.remove('fa-regular', 'fa-circle-dot')
      elementIcon.classList.add('fa-solid', 'fa-check')
   }



   // Handle Password Saving & Setting & Showing

   const passwordsCount = document.querySelector('#password-count')

   let passwords = localStorage.getItem('passwords')
   if(passwords) {
      passwords = JSON.parse(passwords)
      setPasswordsCountText(passwords.length)
   }

   btnPassword.onclick = () => {
      let password = input.value
      if(!validatePassword(password))
         return

      if(!passwords) {
         passwords = [password]
      } else {
         passwords.push(password)
      }

      localStorage.setItem('passwords', JSON.stringify(passwords))
      setPasswordsCountText(passwords.length)
      // input.value = ''
   }

   passwordsCount.onclick = () => {
      if(!passwords) 
         return

      let passwordsString = ''
      passwords.forEach((password, i) => {
         passwordsString += `#${i+1} - ${password}`+"\n"
      })

      alert(passwordsString)
   }

   function setPasswordsCountText (count) {
      if(count > 0)
         passwordsCount.innerText = `Você possui ${count} senhas salvas!`
   }


})()