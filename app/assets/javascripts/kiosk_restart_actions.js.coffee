jQuery ->
  $('#check_all').on 'click', ->
    checked = $(this).prop('checked')
    $(".check_kiosk").prop('checked', checked)
    if checked == true
      $(".btn_edit_selected").removeClass('hidden')
    else
      $(".btn_edit_selected").addClass('hidden')

  $('.check_kiosk').on 'click', ->
    checked_count = $(".check_kiosk:checked").length
    if checked_count > 0
      $(".btn_edit_selected").removeClass('hidden')
    else
      $(".btn_edit_selected").addClass('hidden')

  $('#clear_restart_at_btn').on 'click', ->
    $(".field.restart_at select option[value='']").attr('selected', true)

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
