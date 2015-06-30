function export_wk(user_name, file_path) {

  var lib = 'VISIONGL';

  // .wk header
  var creation_date = Date();
  var str_wk = '# Khoros Visual Programming Workspace\n';
  str_wk += '#\n';
  str_wk += '# cantata workspace file (' + file_path + '.wk) was created\n';
  str_wk += '# on ' + creation_date + '\n';
  str_wk += '# by user ' + user_name + '\n';
  str_wk += '#\n';
  str_wk += '\n';
  str_wk += 'WorkspaceBegin: 2.1\n';
  str_wk += '\n';
  str_wk += 'VariablesBegin:\n';
  str_wk += '\n';
  str_wk += '\n';
  str_wk += '\n';
  str_wk += '# No variables currently declared. #\n';
  str_wk += '\n';
  str_wk += 'VariablesEnd:\n';
  str_wk += '\n';
  // END .wk header

  // .wk Glyphs
  var blocks = $(container_id).children(".block");
  console.log(blocks);
  console.log(blocks.length + " BLOCOS");
  for (var i = 0; i < blocks.length; i++) {
    var block_name = $($(blocks[i]).children('div')[0]).text();
    console.log(block_name);
    var block_pos = $(blocks[i]).position();
    console.log(block_pos);
    var block_id = $(blocks[i]).attr('id').split('_')[1];
    console.log(block_id);
    var block_input_names = $(blocks[i]).children('.ui-widget-content').children('p').children('.vertex.in');
    console.log(block_input_names);
    var func_name = block_name.split(' ').join('_').toLowerCase();
    console.log(func_name);

    // Comment
    str_wk += '# Glyph ' + '\'' + block_name + '\'\n';

    // Glyph info
    str_wk += 'Glyph:' + lib + ':' + func_name + '::localhost:' + block_id + ':' + block_pos.left + ':' + block_pos.top + '::';
    for (var i = 0; i < block_input_names.length; i++) {
      str_wk += " -" + $(block_input_names[i]).parent().text().trim();
    }

    str_wk += '\n\n'
  }
  // END .wk Glyphs

  // .wk Connections
  // END .wk Connections

  // .wk footer
  str_wk += '\n';
  str_wk += 'AnnotationsBegin\n';
  str_wk += '\n';
  str_wk += 'AnnotationsEnd\n';
  str_wk += '\n';
  str_wk += 'WorkspaceEnd: 2.1\n';
  // END .wk footer

  return str_wk;
}
