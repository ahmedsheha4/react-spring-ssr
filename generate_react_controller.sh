#!/bin/bash

destination_directory="server/src/main/java/com/example/demo"
pages_directory="client/pages"
filenames=()


if [ -d "$pages_directory" ]; then
  for file in "$pages_directory"/*; do
    if [ -f "$file" ]; then
      filename=$(basename -- "$file")
      filename_no_extension="${filename%.*}"
      filenames+=("$filename_no_extension")
    fi
  done
else
  echo "Directory not found: $pages_directory"
fi


react_java_content='
package com.example.demo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class React {

'

for file in "${filenames[@]}"; do
    react_java_content+="
    @GetMapping(\"/$file\")
    public String $file() {
        return \"$file\";
    }

"
done

react_java_content+='
}
'

echo "$react_java_content" > "$destination_directory/React.java"

echo "React.java file has been generated with the specified content."
