#!/usr/bin/perl -w

use File::Basename;
use perlModules::common qw( LineStartMultiLineComment
               LineStartSingleLineComment
               LineStartCleanComments
               LineStartParenthesis
               LineStartTypeStar
               LineStartVariable
               LineStartDefault
               LineStartSeparator
             );

#############################################################################
# LineStartCommentedDefault
#
# Returns the string, between /* and */, after the variable
# in start of $line, that defines its default value, blank string if not found.
#
sub LineStartCommentedDefault { # ($line) {
  my $line = $_[0];

  $line =~ s#^\s*/\*\s*(=\s*[\.\w]*)\s*\*/##;
  return ($1, $line);
}

#############################################################################
# LineStartHeader
#
# Returns the header of the program, that is, the
# text starting with __kernel until the character before {
#
sub LineStartHeader { # ($line) {
  my $line = $_[0];

  $line =~ s#^\s*((__kernel)\s*(void)[\s\S]*?)\{##; # *? is ungreedy match
  $result = $1;
  $result =~ s#\s+# #g;

  return ($result, $line);
}

#############################################################################
# LineStartSemantics
#
# Returns the string after the semantic binding and the ":"
# in start of $line, blank string if not found.
# Valid semantic bindings are __read_only, __write_only, __read_write,
# __constant and __global.
#
sub LineStartSemantics { # ($line) {
  my $line = $_[0];

  $line =~ s#^\s*(__read_only|__write_only|__read_write|__constant|__global)\s*##;
  $semantics = $1;
  if ($semantics){
    if (!($semantics =~ m#^(__read_only|__write_only|__read_write|__constant|__global)$#))
    {
      print "Semantic $semantics invalid. Valid semantics are (__read_only|__write_only|__read_write|__constant|__global)\n";
    }
  }
  else{
    $semantics = "";
  }
  return ($semantics, $line);
}

#############################################################################
# LineStartDirective
#
# Returns the string after the directive
# in start of $line, blank string if not found.
# Valid directives are SCALAR and ARRAY
#
sub LineStartDirective { # ($line) {
  my $line = $_[0];

  $line =~ s#^\s*([a-zA-Z_]\w*)\s*##;
  my $result = $1;
  print "Directive type >>>$result<<<\n";
  if ($result){
    if (!($result =~ m#^(SCALAR|ARRAY)$#))
    {
      die "Directive $result invalid. Valid directives are (SCALAR|ARRAY)\n";
    }
  }
  else{
    $result = "";
  }
  return ($result, $line);
}

#############################################################################
# LineStartSize
#
# Returns the string between [] in
# start of $line, blank string if not found.
#
sub LineStartSize { # ($line) {
  my $line = $_[0];

  $line =~ s#^\s*\[\s*(.*)\s*\]##;
  my $result = $1;
  print "Found size >>>$result<<<\n";
  return ($result, $line);
}

#############################################################################
# LineStartMain
#
# Returns the string that contains the expression __kernel void.
#
sub LineStartMain { # ($line) {
  my $line = $_[0];

  $line =~ s#^\s*((__kernel)\s*(void)\s*)##;
  return ($1, $line);
}

#############################################################################
# ProcessClDirectives
#
# Receives as input an array of CL directives and links them to the respective variables
#
# A CL Directive purpose is to specify the size of arrays passed as parameters to
# a kernel. The size is needed by the wrapper to calculate the buffer size. The buffer
# size is passed as parameter to clCreateBuffer and clEnqueueWriteBuffer.
#
sub ProcessClDirectives { # ($directives, $variable) {
  my $directives   = $_[0];
  my $variable     = $_[1];

  my $i = 0;
  my $j = 0;

  my $result_directive;
  my $result_variable;
  my $result_size;


  print "ProcessClDirectives directives size = $#directives\n";
  print "ProcessClDirectives variable size   = $#variable\n";

  for ($i = 0; $i <= $#variable; $i++){
    $is_array[$i] = 0;
    $size[$i]     = "1";
    print "-----------Is array [$i]: $is_array[$i]\n";
    print "-----------Size     [$i]: $size[$i]\n";

  }


  print "ProcessClDirectives directives size = $#directives\n";
  die;

  for ($i = 0; $i <= $#directives; $i++){
    print "###########################################################\n";
    print "Processing directive comment[$i]: >>>>$directives[$i]<<<<\n";

    ($result_directive, $directives[$i]) = LineStartDirective($directives[$i]);
    print "1 Directive type = >>>$result_directive<<<\n";
    if (!$result_directive){
      die "Error: Start-of-line directive (SCALAR|ARRAY) not found\n";
    }
    else{
      print "After eliminating directive (SCALAR|ARRAY):\n$directives[$i]\n";
    }

    ($result_variable, $directives[$i]) = LineStartVariable($directives[$i]);
    print "2 Variable name = >>>$result_variable<<<\n";
    if (!$result_variable){
      die "Error: Start-of-line variable name not found\n";
    }
    else{
      print "After eliminating variable name:\n$directives[$i]\n";
    }

    print "3 Directive type = >>>$result_directive<<<\n";
    if ($result_directive eq "ARRAY"){
      print "Searching size of ARRAY type directive\n";
      ($result_size, $directives[$i]) = LineStartSize($directives[$i]);
      if (!$result_size){
        die "Error: Start-of-line size value not found\n";
      }
      else{
        print "After eliminating size value:\n$directives[$i]\n";
      }
    }

    print "FOR STARTING $#variable\n";
    for ($j = 0; $j <= $#variable; $j++){
      print ">>>$result_variable<<< == >>>$variable[$j]<<<\n";
      if ($result_variable eq $variable[$j]){
        if ($result_directive eq "ARRAY"){
          $is_array[$j] = 1;
          $size[$j] = $result_size;
          print "Is array [$j]: $is_array[$j]\n";
          print "Size     [$j]: $size[$j]\n";
        }
      }
    }
  }

    for ($j = 0; $j <= $#variable; $j++){
          print "Is array [$j]: $is_array[$j]\n";
          print "Size     [$j]: $size[$j]\n";
    }

  return ($is_array, $size);

}

#############################################################################
# ProcessClDirective
#
# Receives as input a CL directive and returns directive type, variable name and size.
#
# A CL Directive purpose is to specify the size of arrays passed as parameters to
# a kernel. The size is needed by the wrapper to calculate the buffer size. The buffer
# size is passed as parameter to clCreateBuffer and clEnqueueWriteBuffer.
#
sub ProcessClDirective { # ($directive) {
  my $directive   = $_[0];

  my $i = 0;
  my $j = 0;

  my $result_directive;
  my $result_variable;
  my $result_size;
  my $result_isarray;


    print "ProcessingClDirective started###########################################################\n";
    print "ProcessClDirective directives size = $#directive\n";
    print "Processing directive comment[$i]: >>>>$directive<<<<\n";

    ($result_directive, $directive) = LineStartDirective($directive);
    print "1 Directive type = >>>$result_directive<<<\n";
    if (!$result_directive){
      die "Error: Start-of-line directive (SCALAR|ARRAY) not found\n";
    }
    else{
      print "After eliminating directive (SCALAR|ARRAY):\n$directive\n";
    }

    ($result_variable, $directive) = LineStartVariable($directive);
    print "2 Variable name = >>>$result_variable<<<\n";
    if (!$result_variable){
      die "Error: Start-of-line variable name not found\n";
    }
    else{
      print "After eliminating variable name:\n$directive\n";
    }

    print "3 Directive type = >>>$result_directive<<<\n";
    if ($result_directive eq "ARRAY"){
      print "Searching size of ARRAY type directive\n";
      ($result_size, $directive) = LineStartSize($directive);
      if (!$result_size){
        die "Error: Start-of-line size value not found\n";
      }
      else{
        print "After eliminating size value:\n$directive\n";
      }
    }

    $result_isarray = 0;
    if ($result_directive eq "ARRAY"){
      $result_isarray = 1;
    }

  return ($result_isarray, $result_variable, $result_size);

}

#############################################################################
# ProcessClHeader
#
# Receives as input a CL header line and breaks it
#
#
sub ProcessClHeader { # ($line) {
  my $line          = $_[0];

  my $result;
  my $kernelname;
  my $separator;
  my $semantics;
  my $type;
  my $output;
  my $variable;

  ($result, $line) = LineStartMain($line);
  if (!$result){
    die "Error: Start-of-line \"__kernel void\" not found\n";
  }
  else{
    #print "After eliminating \"__kernel void\":\n$line\n";
  }

  ($kernelname, $line) = LineStartVariable($line);
  if (!$kernelname){
    die "Error: Start-of-line kernel name identifier not found\n";
  }
  else{
    #print "After eliminating kernel name \"$kernelname\":\n$line\n";
  }


  $line = LineStartParenthesis($line);
  if (!$line){
    die "Error: Start-of-line parenthesis not found\n";
  }
  else{
    #print "After eliminating parenthesis:\n$line\n";
  }

  ($separator, $line) = LineStartSeparator($line);

  if ($separator and $separator eq ")"){
    print "No parameters found\n";
    return;
  }

  my $i = 0;

  $separator = ",";
  while ($separator and $separator eq ","){

    ($semantics[$i], $line) = LineStartSemantics($line);
    if (!$semantics[$i]){
      print "Start-of-line semantics not found\n";
    }
    else{
      print "After eliminating semantics:\n$line\n";
    }

    ($type[$i], $line) = LineStartTypeStar($line);
    if (!$type[$i]){
      print "Start-of-line type not found\n";
    }
    else{
      #print "After eliminating type:\n$line\n";
    }

    ($variable[$i], $line) = LineStartVariable($line);
    if (!$variable[$i]){
      print "Start-of-line variable not found\n";
    }
    else{
      #print "After eliminating variable:\n$line\n";
    }

    ($default[$i], $line) = LineStartCommentedDefault($line);
    if (!$default[$i]){
      #print "Start-of-line default not found\n";
    }
    else{
      #print "After eliminating variable:\n$line\n";
    }

    ($separator, $line) = LineStartSeparator($line);

    if ($separator and $separator eq ","){
      #print "Variable list continues\n";
    }

    print "Semantics[$i]: " . ($semantics[$i] or "") . "\n";
    print "Type     [$i]: $type[$i]\n";
    print "Variable [$i]: $variable[$i]\n";
    print "Default  [$i]: " . ($default[$i] or "") . "\n";

    $i++;
  }
  print "variable size ====== $#variable\n";

  return ($semantics, $type, $variable, $default, $kernelname);

}

#############################################################################
# ProcessClFile
#
# Receives as input a CL filename and generates CPP wrapper function
#
#
sub ProcessClFile { # ($filename, $output, $cpp_read_path) {
  my $filename      = $_[0];
  my $output        = $_[1];
  my $cpp_read_path = $_[2];

  my $comment;
  my $semantics;
  my $type;
  my $variable;
  my $default;
  my $uniform;
  my $dircomment;
  my $is_array;
  my $size;

  print "directive size = $#dircomment\n";

  undef $comment;
  undef $semantics;
  undef $type;
  undef $variable;
  undef $default;
  undef $uniform;
  undef $dircomment;
  undef $is_array;
  undef $size;

  print "directive size = $#dircomment\n";
  #print "directive 0 = $dircomment[0]\n";
  #print "directive 1 = $dircomment[1]\n";
  print "commment size = $#comment\n";
  print "semantics size = $#semantics\n";
  print "type size = $#type\n";
  print "variable size = $#variable\n";

  open CL, $filename;
  @list = <CL>;
  $line = join("", @list);
  close CL;

  ($comment, $line) = LineStartMultiLineComment($line);
  if (!$comment){
    print "Start-of-file comment not found\n";
  }
  else{
    print "Found this comment:\n$comment\n";
  }

  print "directive size = $#directive\n";

  my $i = 0;
  my $catdirectives = "";
  do {
    ($dircomment[$i], $line) = LineStartSingleLineComment($line);
    print "directive[$i] = >>$dircomment[$i]<< size = >>$#dircomment<<\n";
    if ($dircomment[$i]){
      print ("Found directive: $dircomment[$i]\n");
      ($dirisarray[$i], $dirvar[$i], $dirsize[$i]) = ProcessClDirective($dircomment[$i]);
      print ("ProcessClFile result = <$dirisarray[$i]> <$dirvar[$i]> <$dirsize[$i]>\n");
    }
    else{
      #print ("Directive not found\n");
    }
    $i++;
  }
  while ($dircomment[$i-1]);
  delete $dircomment[$i-1];
  print "DIRECTIVE SIZE AFTER LineStartSingleLineComment: $#dircomment\n";

  print "Starting for to print directives found\n";
  for($i = 0; $i <= $#dirvar; $i++){
      print ("ProcessClFile result = <$dirisarray[$i]> <$dirvar[$i]> <$dirsize[$i]>\n");
  }

  ($perl_header, $line) = LineStartHeader($line);
  if (!$perl_header){
    print "Error: start-of-file header not found\n";
    return;
  }
  else{
    print "Found this header:\n$perl_header\n";
  }

  ($semantics, $type, $variable, $default, $kernelname) = ProcessClHeader($perl_header);
  print "variable sizeeeeee = $#variable\n";
  print "ProcessClFile dircomment size = $#dircomment\n";


  print "FOR STARTING $#variable\n";
  for($i = 0; $i <= $#variable; $i++){
    $is_array[$i] = 0;
    $size[$i]     = 1;
  }
  print "FOR STARTING $#variable\n";
  for($i = 0; $i <= $#variable; $i++){
    for ($j = 0; $j <= $#dirvar; $j++){
       print ">>>$variable[$i]<<< == >>>$dirvar[$j]<<<\n";
       if ($variable[$i] eq $dirvar[$j] && $dirisarray[$j]){
         $is_array[$i] = $dirisarray[$j];
         $size[$i]     = $dirsize[$j];
         print "Is array [$i]: $is_array[$i]\n";
         print "Size     [$i]: $size[$i]\n";
       }
     }
   }

  my $j = 0;

  if ($kernelname ne $basename){
    die "Error: File basename \"$basename\" != kernel name \"$kernelname\". Please rename your kernel to \"$basename\"\n";
  }
  #$line = LineStartCleanComments($line);

  print "\n";
  for($i = 0; $i <= $#variable; $i++){
    print "Semantics[$i]: " . ($semantics[$i] or "") . "\n";
    print "Type     [$i]: $type[$i]\n";
    print "Variable [$i]: $variable[$i]\n";
    print "Default  [$i]: " . ($default[$i] or "") . "\n";
    print "Array?   [$i]: $is_array[$i]\n";
    print "Size     [$i]: $size[$i]\n";
  }

  return  ($comment, $semantics, $type, $variable, $is_array, $size);
}

#############################################################################
# PrintCppFile
#
# Receives as input a CL filename and generates CPP wrapper function
#
#
sub PrintCppFile { # ($basename, $comment, $semantics, $type, $variable, $default, $uniform, $output, $cpp_read_path) {
  my $basename      = $_[0];
  my $comment       = $_[1];
  my $semantics     = $_[2];
  my $type          = $_[3];
  my $variable      = $_[4];
  my $default       = $_[5];
  my $is_array      = $_[6];
  my $size          = $_[7];
  my $output        = $_[8];
  my $cpp_read_path = $_[9];

  my $i;
  my $first_framebuffer = "";

  print "Will write to $output.cpp and $output.h\n";

  open CPP, ">>", "$output.cpp";
  open HEAD, ">>", "$output.h";

  print CPP "$comment\n";
  print HEAD "$comment\n";

  print CPP "void $basename(";
  print HEAD "void $basename(";
  for ($i = 0; $i <= $#type; $i++){
    print ">>>$type[$i]<<< becomes ";
    if ( ($semantics[$i] eq "__read_only") or ($semantics[$i] eq "__write_only") or ($semantics[$i] eq "__global") ){
      if ( ($type[$i] eq "image2d_t") or ($type[$i] eq "image3d_t") or ($type[$i] eq "char*") or ($type[$i] eq "int*") or ($type[$i] eq "unsigned char*") or ($type[$i] eq "unsigned int*") ){
        $type[$i] = "VglImage*";
      }
    }
    else{
      $type[$i] =~ s#^\s*([a-zA-Z_][a-zA-Z0-9_]*)##;
      $type[$i] = $1;
    }
    print ">>>$type[$i]<<<\n";
  }

  for ($i = 0; $i <= $#type; $i++){
    my $p = "";
    if ($is_array[$i]){
      $p = "*";
    }
    print CPP "$type[$i]$p $variable[$i]";
    print HEAD "$type[$i]$p $variable[$i]";
    if ($default[$i]){
      print HEAD " $default[$i]";
    }
    if ($i < $#type){
      print CPP ", ";
      print HEAD ", ";
    }
  }
  print CPP "){\n";
  print HEAD ");\n\n";

  for ($i = 0; $i <= $#type; $i++){
    if ($semantics[$i] eq "__read_only" or $semantics[$i] eq "__write_only" or $semantics[$i] eq "__read_write" or $semantics[$i] eq "__global"){
        print CPP "
  vglCheckContext($variable[$i]".", VGL_CL_CONTEXT);";
    }
  }

  print CPP "

  cl_int err;
";

  for ($i = 0; $i <= $#type; $i++){
    if ( ($type[$i] ne "VglImage*") and ($is_array[$i]) ){
        $var = $variable[$i];
        my $e = "&";
        if ($is_array[$i]){
          $e = "";
	}
        print CPP "
  cl_mem mobj_$var = NULL;
  mobj_$var = clCreateBuffer(cl.context, CL_MEM_READ_ONLY, ($size[$i])*sizeof($type[$i]), NULL, &err);
  vglClCheckError( err, (char*) \"clCreateBuffer $var\" );
  err = clEnqueueWriteBuffer(cl.commandQueue, mobj_$var, CL_TRUE, 0, ($size[$i])*sizeof($type[$i]), $e$var, 0, NULL, NULL);
  vglClCheckError( err, (char*) \"clEnqueueWriteBuffer $var\" );
";
    }
  }

        print CPP "
  static cl_program program = NULL;
  if (program == NULL)
  {
    char* file_path = (char*) \"$cpp_read_path$basename\.cl\";
    printf(\"Compiling %s\\n\", file_path);
    std::ifstream file(file_path);
    if(file.fail())
    {
      fprintf(stderr, \"%s:%s: Error: File %s not found.\\n\", __FILE__, __FUNCTION__, file_path);
      exit(1);
    }
    std::string prog( std::istreambuf_iterator<char>( file ), ( std::istreambuf_iterator<char>() ) );
    const char *source_str = prog.c_str();
#ifdef __DEBUG__
    printf(\"Kernel to be compiled:\\n%s\\n\", source_str);
#endif
    program = clCreateProgramWithSource(cl.context, 1, (const char **) &source_str, 0, &err );
    vglClCheckError(err, (char*) \"clCreateProgramWithSource\" );
    err = clBuildProgram(program, 1, cl.deviceId, NULL, NULL, NULL );
    vglClBuildDebug(err, program);
  }

  static cl_kernel kernel = NULL;
  if (kernel == NULL)
  {
    kernel = clCreateKernel( program, \"$basename\", &err );
    vglClCheckError(err, (char*) \"clCreateKernel\" );
  }

";

  for ($i = 0; $i <= $#type; $i++){
    if ($type[$i] eq "VglImage*"){
      $addr = "(void*) &$variable[$i]->oclPtr";
    }
    elsif ($is_array[$i]){
      $addr = "($type[$i]*) &mobj_$variable[$i]";
    }
    else{
      $addr = "&$variable[$i]";
    }
    if ( ($type[$i] eq "VglImage*") or ($is_array[$i]) ){
      $sizeof = "cl_mem";
    }
    else{
      $sizeof = "$type[$i]";
    }


    print CPP "
  err = clSetKernelArg( kernel, $i, sizeof( $sizeof ), $addr );
  vglClCheckError( err, (char*) \"clSetKernelArg $i\" );
";
  }

  for ($i = 0; $i <= $#type; $i++){
    if ($type[$i] eq "VglImage*"){
      $var_worksize = $variable[$i];
      last;
    }
  }

  print CPP "
  if ($var_worksize->ndim <= 2){
    size_t worksize[] = { $var_worksize->shape[VGL_WIDTH], $var_worksize->shape[VGL_HEIGHT], 1 };
    clEnqueueNDRangeKernel( cl.commandQueue, kernel, 2, NULL, worksize, 0, 0, 0, 0 );
  }
  else if ($var_worksize->ndim == 3){
    size_t worksize[] = { $var_worksize->shape[VGL_WIDTH], $var_worksize->shape[VGL_HEIGHT], $var_worksize->shape[VGL_LENGTH] };
    clEnqueueNDRangeKernel( cl.commandQueue, kernel, 3, NULL, worksize, 0, 0, 0, 0 );
  }
  else{
    printf(\"More than 3 dimensions not yet supported\\n\");
  }

  vglClCheckError( err, (char*) \"clEnqueueNDRangeKernel\" );
";

  for ($i = 0; $i <= $#type; $i++){
    if (($type[$i] ne "VglImage*") && ($semantics[$i] ne "__write_only") && ($is_array[$i] != 0)){
      print CPP "
  err = clReleaseMemObject( mobj_$variable[$i] );
  vglClCheckError(err, (char*) \"clReleaseMemObject mobj_$variable[$i]\");
";
    }
  }

  for ($i = 0; $i <= $#type; $i++){
    if ($semantics[$i] eq "__write_only" or $semantics[$i] eq "__read_write" or $semantics[$i] eq "__global"){
      print CPP "
  vglSetContext($variable[$i]".", VGL_CL_CONTEXT);
";
    }
  }


  print CPP "}\n\n";


  close CPP;
  close HEAD;
}
#############################################################################
# PrintHtmlFile
#
# Receives as input a CL filename and generates html tags
#
#
sub PrintHtmlFile { # ($basename, $comment, $semantics, $type, $variable, $default, $uniform, $output, $cpp_read_path) {
  my $basename      = $_[0];
  my $comment       = $_[1];
  my $semantics     = $_[2];
  my $type          = $_[3];
  my $variable      = $_[4];
  my $default       = $_[5];
  my $is_array      = $_[6];
  my $size          = $_[7];
  my $output        = $_[8];
  my $cpp_read_path = $_[9];

  my $i;
  my $first_framebuffer = "";

  print "Will write to $output.html\n";

  open HTML, ">>", "$output.html";

  print HTML "<div class=\"lblock ui-corner-all noselect\">";
  print HTML "<div class=\"ui-widget-header ui-corner-top\">$basename</div>";
  print HTML "<div class=\"ui-widget-content ui-corner-bottom\">";

  for ($i = 0; $i <= $#type; $i++){
    if ($semantics[$i] eq "__read_only"){
      print HTML "<p class=\"pleft\"><span class=\"vertex in ";
    }else{
      if ($semantics[$i] eq "__write_only"){
        print HTML "<p class=\"pright\"><span class=\"vertex out ";
      }else{
        print HTML "<p class=\"pleft\"><span class=\"vertex in ";
      }
    }

    if ($type[$i] eq "VglImage*"){
      print HTML "image";
    }else{
      print HTML "$type[$i]";
    }
    print HTML "\"></span>$variable[$i]</p>";

  }

  print HTML "</div>";
  print HTML "</div>";

  close HTML;
}

#############################################################################
# Main program
#
#

$USAGE="
Usage:

cl2cpp  [-o OutputFile] [-p ShadersPath] InputFileList

OutputFile      Source file to which the output will be written. Two files
                are written with this prefix, a \".cpp\" and a \".h\".
                It is optional and the default is \"cl2cpp_shaders\".

ShadersPath     Path to shader files, added to cpp source code before the
                shader file name. Default is blank.

InputFileList   List of input files. Wildcard characters are allowed.
                Must be placed after the other parameters.

";

print $USAGE;


$nargs = $#ARGV;
$nargs++;
print "Number of args = $nargs\n";


for ($i=0; $i<$nargs; $i=$i+2) {
  if    ($ARGV[$i] eq "-o") {
    $output = $ARGV[$i+1] ;
    print ("Output Files: $output.cpp and $output.h\n") ;
  }
  elsif ($ARGV[$i] eq "-p") {
    $cpp_read_path = $ARGV[$i+1] ;
    print ("Shader files search path: $cpp_read_path\n") ;
  }
  else {
    last;
  }
}

if (!$output){
  $output = "cl2cpp_shaders";
}


if (!$cpp_read_path){
  $cpp_read_path = "";
}
elsif ($cpp_read_path =~ m#[^/]$#){
  $cpp_read_path = "$cpp_read_path/";
}


$firstInputFile = $i;

my @files = ();
for ($i=$firstInputFile; $i<$nargs; $i=$i+1) {
  push @files, glob $ARGV[$i];
}
print "Size of files = $#files\n";
for ($i=0; $i<=$#files; $i=$i+1) {
    print $files[$i], "\n";
}

unlink("$output.cpp");
unlink("$output.h");

$topMsg = "
/*********************************************************************\
***                                                                 ***
***  Source code generated by cl2cpp.pl                             ***
***                                                                 ***
***  Please do not edit                                             ***
***                                                                 ***
\*********************************************************************/
";
open HEAD, ">>", "$output.h";
print HEAD $topMsg;
print HEAD "#include \"vglImage.h\"\n";
close HEAD;
open CPP, ">>", "$output.cpp";
print CPP $topMsg;
print CPP "
#include \"vglImage.h\"
#include \"vglClImage.h\"
#include \"vglContext.h\"\n

#include <fstream>

extern VglClContext cl;

";
close CPP;

$i = 0;

for ($i=0; $i<=$#files; $i++) {
    $fullname = $files[$i];

    print "====================\n";
    print "$files[$i]\n";
    print "i = $i\n";
    print "nargs = $nargs\n";
    ($a, $b, $c) = fileparse($fullname, ".cl");
    $a or $a = "";
    $b or $b = "";
    $c or $c = "";
    print "Path: $b\n";
    print "Basename: $a\n";
    print "Extenssion: $c\n";
    #print "name: ".basename($fullname)." path: ".dirname($fullname)."\n";
    $basename = $a;

    undef $comment;
    undef @semantics;
    undef @type;
    undef @variable;
    undef @uniform;


    ($comment, $semantics, $type, $variable, $default, $uniform) = ProcessClFile($fullname);

    PrintCppFile($basename, $comment, $semantics, $type, $variable, $default, $is_array, $size, $output, $cpp_read_path);
    PrintHtmlFile($basename, $comment, $semantics, $type, $variable, $default, $is_array, $size, $output, $cpp_read_path);

}
