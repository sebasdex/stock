import FormGrid from "@/components/FormGrid";
import FormAssignment from "@/components/assignmentForm/FormAssignment";
import TableAssignment from "@/components/assignmentForm/TableAssignment";
function assignmentPage() {
  return (
    <>
      <FormGrid text="Asignar equipo">
        <FormAssignment />
      </FormGrid>
      <TableAssignment />
    </>
  );
}

export default assignmentPage;
