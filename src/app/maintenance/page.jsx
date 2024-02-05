import FormGrid from "@/components/FormGrid";
import FormMaintenance from "@/components/maintenanceForm/FormMaintenance";
import TableMaintenance from "@/components/maintenanceForm/TableMaintenance";

function maintenancePage() {
  return (
    <>
      <FormGrid text="Agregar Mantenimiento">
        <FormMaintenance />
      </FormGrid>
      <TableMaintenance />
    </>
  );
}

export default maintenancePage;
