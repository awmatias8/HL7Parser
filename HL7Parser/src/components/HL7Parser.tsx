import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, X } from "lucide-react";
import { toast } from "sonner";

interface HL7Segment {
  type: string;
  fields: string[];
  raw: string;
}

export const HL7Parser = () => {
  const [message, setMessage] = useState("");
  const [segments, setSegments] = useState<HL7Segment[]>([]);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  const parseHL7Message = () => {
    if (!message.trim()) {
      toast.error("Por favor ingresa un mensaje HL7");
      return;
    }

    try {
      const lines = message.split(/[\r\n]+/).filter(line => line.trim());
      const parsed: HL7Segment[] = lines.map(line => {
        const fields = line.split("|");
        return {
          type: fields[0],
          fields: fields,
          raw: line,
        };
      });

      setSegments(parsed);
      toast.success(`${parsed.length} segmentos analizados correctamente`);
    } catch (error) {
      toast.error("Error al analizar el mensaje HL7");
    }
  };

  const clearParser = () => {
    setMessage("");
    setSegments([]);
    setSelectedSegment(null);
  };

  const getSegmentColor = (type: string) => {
    const colors: Record<string, string> = {
      MSH: "bg-primary/10 text-primary border-primary/20",
      PID: "bg-accent/10 text-accent border-accent/20",
      OBR: "bg-info/10 text-info border-info/20",
      OBX: "bg-success/10 text-success border-success/20",
      NK1: "bg-warning/10 text-warning border-warning/20",
    };
    return colors[type] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-elegant transition-smooth hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Entrada de Mensaje HL7
          </CardTitle>
          <CardDescription>
            Pega tu mensaje HL7 para analizarlo por segmentos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="MSH|^~\&|SENDING_APP|SENDING_FAC|RECEIVING_APP|RECEIVING_FAC|20230101120000||ADT^A01|MSG00001|P|2.5&#10;PID|1||12345^^^HOSPITAL^MR||DOE^JOHN^A||19800101|M|||123 MAIN ST^^ANYTOWN^CA^12345"
            className="min-h-[200px] font-mono text-sm"
          />
          <div className="flex gap-2">
            <Button onClick={parseHL7Message} className="flex-1">
              <Search className="mr-2 h-4 w-4" />
              Analizar Mensaje
            </Button>
            {segments.length > 0 && (
              <Button onClick={clearParser} variant="outline">
                <X className="mr-2 h-4 w-4" />
                Limpiar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {segments.length > 0 && (
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Segmentos Identificados ({segments.length})</CardTitle>
            <CardDescription>
              Haz clic en un segmento para ver sus detalles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {segments.map((segment, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
                  selectedSegment === segment.raw
                    ? "ring-2 ring-primary scale-[1.02]"
                    : "hover:scale-[1.01]"
                } ${getSegmentColor(segment.type)}`}
                onClick={() => setSelectedSegment(segment.raw)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="font-mono">
                        {segment.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {segment.fields.length} campos
                      </span>
                    </div>
                    <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all">
                      {segment.raw}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {selectedSegment && (
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Detalles del Segmento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {selectedSegment.split("|").map((field, index) => (
                <div
                  key={index}
                  className="flex gap-2 p-2 rounded bg-muted/50 hover:bg-muted transition-smooth"
                >
                  <Badge variant="outline" className="shrink-0">
                    Campo {index}
                  </Badge>
                  <code className="text-sm flex-1">{field || "(vacío)"}</code>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
