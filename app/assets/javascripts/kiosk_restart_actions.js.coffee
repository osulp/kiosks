jQuery ->
  $(document).on("change", 'input.enable_restart_at', (event) ->
    if this.checked == true

      $(".field.restart_at").removeClass('hidden')
    else
      $(".field.restart_at").addClass('hidden')


#    $(target).find('input.timepicker_start').datetimepicker('show')
  )
  $('#set_today_btn').on 'click', ->
    field = 'kiosk_restart_at'
    dt = new Date()

    t1 = $('#' + field + '_1i')
    t1.val(dt.getFullYear())

    t2 = $('#' + field + '_2i')
    t2.val(dt.getMonth() + 1)

    t3 = $('#' + field + '_3i')
    t3.val(dt.getDate())

    t4 = $('#' + field + '_4i')
    if dt.getHours() < 10
      hours = "0" + dt.getHours()
    else
      hours = dt.getHours()

    t4.val(hours)

    t5 = $('#' + field + '_5i')
    if dt.getMinutes() < 10
      min = "0" + dt.getMinutes()
    else
      min = dt.getMinutes()

    t5.val(min)

#  $('#collapseKioskRestart').on 'hide.bs.collapse', ->
#    $('#add_restart').text('+ Add one-time restart date/time')
#    $("#collapseKioskRestart select option[value='']").attr('selected', true)

