import FormGrid from "@/components/FormGrid";
import FormEmployee from "@/components/employeesForm/FormEmployee";
import TableEmployee from "@/components/employeesForm/TableEmployee";

function employeesPage() {
  return (
    <>
      <FormGrid text={"Agregar Empleado"}>
        <FormEmployee />
      </FormGrid>
      <TableEmployee />
    </>
  );
}

export default employeesPage;
