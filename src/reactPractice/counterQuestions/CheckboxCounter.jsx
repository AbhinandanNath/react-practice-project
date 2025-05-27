// Display 4 checkboxes with different names and a button named selectall
// User can select each checkbox
// Select all button click will check all checkboxes
// Button should be disabled once all checkboxes are selected.
// Display selected checkboxes count and names in ui.
import styled from "styled-components";
import higherOrderStyledComponent from "../../jsPractice/HOC/HigherOrderStyledComponent";
import { BaseButtonComponent } from "../../jsPractice/HOC/BaseButtonComponent";
import { useState } from "react";

const FieldSetComp = styled.fieldset`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem auto;
  border: 1px solid rgb(26, 115, 232);
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  width: 75rem;
  align-items: center;
`;
const CheckboxContainer = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(0, 0, 0);
  border: 1px solid rgb(26, 115, 232);
  border-radius: 1rem;
  overflow: hidden;
  color: white;
  display: flex;
  justify-content: space-evenly;
  gap: 3.5rem;
  padding: 1rem;
`;

const Checkbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap:0.5rem
  padding: 1rem;

  input {
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
`;

const checkBoxList = [
  { id: 1, label: "Checkbox 1", checked: false },
  { id: 2, label: "Checkbox 2", checked: false },
  { id: 3, label: "Checkbox 3", checked: false },
  { id: 4, label: "Checkbox 4", checked: false },
];

export default function CheckboxCounter() {
  const [selectAllCheckbox, setSelectAllCheckBox] = useState(false);
  const [checkBoxMap, setCheckBoxMap] = useState(checkBoxList);

  const StyledButton = higherOrderStyledComponent(BaseButtonComponent);

  function selectAll() {
    setCheckBoxMap((prevState) => {
      const updateCheckBox = [...prevState];
      return updateCheckBox.map((checkbox) => {
        return { ...checkbox, checked: !selectAllCheckbox };
      });
    });
    setSelectAllCheckBox((prevState) => {
      return !prevState;
    });
  }

  function updateCheckbox(id) {
    setCheckBoxMap((prevState) => {
      const updateCheckBox = prevState.map((checkbox) => {
        if (checkbox.id == id) {
          return { ...checkbox, checked: !checkbox.checked };
        }
        return checkbox;
      });
      return updateCheckBox;
    });
  }
  return (
    <FieldSetComp>
      <legend style={{ textAlign: "left" }}>Select a Checkbox:</legend>
      <CheckboxContainer>
        {checkBoxMap.map((item) => {
          return (
            <Checkbox key={item.id}>
              <label htmlFor={item.id}>{item.label}</label>
              <input
                type="checkbox"
                id={item.id}
                checked={item.checked}
                onChange={() => updateCheckbox(item.id)}
                readOnly
              />
            </Checkbox>
          );
        })}
      </CheckboxContainer>
      <StyledButton customClassName="hoc-button2" onClick={selectAll}>
        {selectAllCheckbox ? "Unselect All" : "Select All"}
      </StyledButton>
      <ul>
        {checkBoxMap.map((item) =>
          item.checked ? <li key={item.id}>{item.label}</li> : null
        )}
      </ul>
    </FieldSetComp>
  );
}
