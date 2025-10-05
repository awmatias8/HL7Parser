import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, BookOpen } from "lucide-react";
import { toast } from "sonner";

interface SegmentInfo {
  code: string;
  name: string;
  description: string;
  usage: string;
}

const commonSegments: SegmentInfo[] = [
  {
    code: "MSH",
    name: "Message Header",
    description: "Define la estructura y el propósito del mensaje HL7",
    usage: "Obligatorio en todos los mensajes. Contiene información de enrutamiento y control del mensaje.",
  },
  {
    code: "PID",
    name: "Patient Identification",
    description: "Información demográfica del paciente",
    usage: "Identifica al paciente con datos como nombre, fecha de nacimiento, género, dirección y número de identificación.",
  },
  {
    code: "PV1",
    name: "Patient Visit",
    description: "Información sobre la visita o encuentro del paciente",
    usage: "Contiene detalles sobre la admisión, ubicación, médico tratante y tipo de visita.",
  },
  {
    code: "OBR",
    name: "Observation Request",
    description: "Solicitud de observación o estudio",
    usage: "Define la solicitud de exámenes, procedimientos o estudios diagnósticos.",
  },
  {
    code: "OBX",
    name: "Observation/Result",
    description: "Resultados de observaciones clínicas",
    usage: "Contiene los resultados de pruebas, mediciones o observaciones clínicas.",
  },
  {
    code: "NK1",
    name: "Next of Kin",
    description: "Información del contacto de emergencia o familiar",
    usage: "Datos de contactos de emergencia, relación con el paciente y prioridad de contacto.",
  },
  {
    code: "AL1",
    name: "Patient Allergy Information",
    description: "Información sobre alergias del paciente",
    usage: "Describe alergias conocidas, tipo de alergia, gravedad y reacciones adversas.",
  },
  {
    code: "DG1",
    name: "Diagnosis",
    description: "Información de diagnóstico",
    usage: "Códigos de diagnóstico (ICD-10, ICD-9), tipo de diagnóstico y prioridad.",
  },
  {
    code: "PR1",
    name: "Procedures",
    description: "Información sobre procedimientos realizados",
    usage: "Detalles de procedimientos quirúrgicos o médicos, incluyendo códigos y fechas.",
  },
  {
    code: "IN1",
    name: "Insurance",
    description: "Información del seguro médico",
    usage: "Datos de la compañía aseguradora, número de póliza y cobertura.",
  },
];

export const SegmentExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSegments, setFilteredSegments] = useState(commonSegments);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredSegments(commonSegments);
      return;
    }

    const filtered = commonSegments.filter(
      (seg) =>
        seg.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seg.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredSegments(filtered);
    toast.success(`${filtered.length} segmentos encontrados`);
  };

  const searchHL7Standard = (segmentCode: string) => {
    const url = `https://hl7-definition.caristix.com/v2/HL7v2.5.1/Segments/${segmentCode}`;
    window.open(url, "_blank");
    toast.success(`Abriendo documentación oficial de ${segmentCode}`);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Explorador de Segmentos HL7
          </CardTitle>
          <CardDescription>
            Busca y explora los segmentos estándar de HL7 v2.x
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por código, nombre o descripción..."
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredSegments.map((segment) => (
          <Card
            key={segment.code}
            className="shadow-elegant transition-smooth hover:shadow-lg hover:scale-[1.02]"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className="text-base font-mono bg-primary text-primary-foreground">
                      {segment.code}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{segment.name}</CardTitle>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => searchHL7Standard(segment.code)}
                  className="shrink-0"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>{segment.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Uso:</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {segment.usage}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSegments.length === 0 && (
        <Card className="shadow-elegant">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No se encontraron segmentos que coincidan con tu búsqueda
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
