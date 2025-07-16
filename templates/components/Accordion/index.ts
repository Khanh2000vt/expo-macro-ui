import {AccordionContent} from './content';
import {AccordionHeader} from './header';
import {AccordionItemProvider} from './item';
import {AccordionRootProvider} from './root';

export const Accordion = {
  Root: AccordionRootProvider,
  Item: AccordionItemProvider,
  Header: AccordionHeader,
  Content: AccordionContent,
};

// const Demo = () => {
//     return (
//       <Accordion.Root collapsible defaultValue={["b"]}>
//         {items.map((item, index) => (
//           <Accordion.Item key={index} value={item.value}>
//             <Accordion.Header>
//                 <TextApp>{item.title}</TextApp>
//             </Accordion.Header>
//             <Accordion.Content>
//               <TextApp>{item.text}</TextApp>
//             </Accordion.Content>
//           </Accordion.Item>
//         ))}
//       </Accordion.Root>
//     )
//   }

//   const items = [
//     { value: "a", title: "First Item", text: "Some value 1..." },
//     { value: "b", title: "Second Item", text: "Some value 2..." },
//     { value: "c", title: "Third Item", text: "Some value 3..." },
//   ]
