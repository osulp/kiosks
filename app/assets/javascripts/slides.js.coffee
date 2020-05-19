jQuery ->
  $('#slides').dataTable()
  $(window).load ->
    $('#new_slide, form.edit_slide').on 'submit', (event) ->
      if this.checkValidity() == false
        event.preventDefault()
        event.stopPropagation()

        # clear error messages if any
        $(this).find('.invalid-feedback').remove()

        # set error messages at each invalid field
        invalidElements = document.querySelectorAll('.form-control:invalid')
        for error in invalidElements
          error_message = $('<div>', {'class': 'invalid-feedback'}).html(error.validationMessage)
          $(error).after(error_message)

        # scroll to the first invalid field
        $('html, body').animate scrollTop: $(invalidElements[0]).offset().top - 100
      this.classList.add('was-validated')