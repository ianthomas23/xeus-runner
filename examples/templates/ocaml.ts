// :title: Simple example

import { XeusKernel } from 'xeus-runner';

const kernel = new XeusKernel({
  type: 'ocaml',
  parentElement: 'target',
  showCode: true,
  // :worker:
});
const code = `let my_number = 42 in
print_string "Hello ";
print_int my_number;
print_newline ()`;
kernel.execute({ code });
