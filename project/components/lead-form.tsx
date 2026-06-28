'use client';

import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useInView } from '@/hooks/use-intersection';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Car, Phone, Wrench, Send, CheckCircle2, Trash2, List, FileText, Calendar } from 'lucide-react';

const carBrands = [
  'Ford','Chevrolet','Toyota','Honda','Dodge','Jeep','GMC','Ram',
  'Nissan','Hyundai','Kia','Subaru','Volkswagen','BMW','Mercedes-Benz',
  'Audi','Lexus','Cadillac','Lincoln','Chrysler','Buick',
];

const carModels: Record<string, string[]> = {
  Ford: ['F-150','F-250','Explorer','Escape','Mustang','Edge','Fusion','Ranger','Bronco','Expedition'],
  Chevrolet: ['Silverado 1500','Equinox','Tahoe','Malibu','Colorado','Blazer','Traverse','Trax','Suburban'],
  Toyota: ['Camry','Corolla','RAV4','Tacoma','Highlander','4Runner','Tundra','Prius','Sienna'],
  Honda: ['Civic','Accord','CR-V','Pilot','HR-V','Ridgeline','Odyssey','Passport','Fit'],
  Dodge: ['Ram 1500','Charger','Challenger','Durango','Journey','Grand Caravan'],
  Jeep: ['Wrangler','Cherokee','Grand Cherokee','Renegade','Compass','Gladiator'],
  GMC: ['Sierra 1500','Yukon','Terrain','Acadia','Canyon','Envoy'],
  Ram: ['1500','2500','3500','ProMaster'],
  Nissan: ['Altima','Sentra','Rogue','Frontier','Pathfinder','Armada','Titan','Murano'],
  Hyundai: ['Elantra','Sonata','Tucson','Santa Fe','Kona','Palisade','Ioniq 5'],
  Kia: ['Telluride','Sorento','Sportage','Soul','Forte','Stinger','EV6'],
  Subaru: ['Outback','Forester','Crosstrek','Legacy','Impreza','Ascent','WRX'],
  Volkswagen: ['Jetta','Passat','Tiguan','Atlas','Golf','Taos'],
  BMW: ['3 Series','5 Series','X3','X5','7 Series','X1','M3','M5'],
  'Mercedes-Benz': ['C-Class','E-Class','GLE','GLC','S-Class','A-Class','G-Class'],
  Audi: ['A4','A6','Q5','Q7','A3','Q3','e-tron','RS 5'],
  Lexus: ['RX','ES','NX','GX','LS','IS','UX'],
  Cadillac: ['Escalade','XT5','CT5','XT4','XT6'],
  Lincoln: ['Navigator','Aviator','Corsair','Nautilus'],
  Chrysler: ['300','Pacifica','Voyager'],
  Buick: ['Encore','Enclave','Envision','LaCrosse'],
};

const serviceTypes = [
  'Oil Change','Brake Repair','Tire Services','Wheel Alignment','Battery Replacement',
  'Engine Diagnostics','AC Service & Repair','Suspension Repair','Exhaust Services',
  'Transmission Service','Preventive Maintenance','Denting & Painting','Car Spa & Detailing',
  'Ceramic Coating','Windshield Replacement','Fleet Service','Custom Repairs',
];

const locations = [
  'Virginia Beach (Main) — 1248 N. Great Neck Rd',
  'Chesapeake — 620 Battlefield Blvd S',
  'Norfolk — 7401 Granby St',
  'Hampton Roads — 4012 Shore Dr',
];

interface Appointment {
  id: string;
  name: string;
  phone: string;
  carBrand: string;
  carModel: string;
  service: string;
  location: string;
  date: string;
  message: string;
  createdAt: string;
}

export default function LeadForm() {
  const { ref, inView } = useInView(0.1);
  const { value: appointments, set: setAppointments, loaded } = useLocalStorage<Appointment[]>('ace-appointments', []);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const models = carBrand ? carModels[carBrand] || [] : [];
  useEffect(() => { setCarModel(''); }, [carBrand]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !carBrand || !service) return;
    const appt: Appointment = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      name, phone, carBrand, carModel, service, location, date, message,
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [appt, ...prev]);
    setSubmitted(true);
    setName(''); setPhone(''); setCarBrand(''); setCarModel('');
    setService(''); setLocation(''); setDate(''); setMessage('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  const deleteAppt = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <section id="appointment" ref={ref} className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className={`inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 ${inView ? 'animate-fade-up' : 'opacity-0'}`}>
            Online Appointment
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${inView ? 'animate-fade-up stagger-1' : 'opacity-0'}`}>
            Book Your
            <span className="gradient-text"> Service Appointment</span>
          </h2>
          <p className={`text-muted-foreground max-w-xl mx-auto text-lg ${inView ? 'animate-fade-up stagger-2' : 'opacity-0'}`}>
            Select your vehicle, service, location, and preferred date. We will confirm within 30 minutes.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className={`lg:col-span-3 ${inView ? 'animate-slide-left stagger-3' : 'opacity-0'}`}>
            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-6 md:p-8">
                {submitted && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 animate-scale-in">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-emerald-800">Appointment Requested!</p>
                      <p className="text-sm text-emerald-600">We will call you within 30 minutes to confirm.</p>
                    </div>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Smith" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="phone" type="tel" placeholder="(757) 555-0100" className="pl-10" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Vehicle Brand <span className="text-destructive">*</span></Label>
                      <Select value={carBrand} onValueChange={setCarBrand}>
                        <SelectTrigger><Car className="w-4 h-4 mr-2 text-muted-foreground" /><SelectValue placeholder="Select brand" /></SelectTrigger>
                        <SelectContent>{carBrands.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Vehicle Model</Label>
                      <Select value={carModel} onValueChange={setCarModel} disabled={!carBrand}>
                        <SelectTrigger><SelectValue placeholder="Select model" /></SelectTrigger>
                        <SelectContent>{models.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Service Type <span className="text-destructive">*</span></Label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger><Wrench className="w-4 h-4 mr-2 text-muted-foreground" /><SelectValue placeholder="Select service" /></SelectTrigger>
                      <SelectContent>{serviceTypes.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Preferred Location</Label>
                      <Select value={location} onValueChange={setLocation}>
                        <SelectTrigger><SelectValue placeholder="Select location" /></SelectTrigger>
                        <SelectContent>{locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="date" type="date" className="pl-10" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Notes</Label>
                    <Input id="message" placeholder="Describe the issue or any special requests..." value={message} onChange={(e) => setMessage(e.target.value)} />
                  </div>

                  <Button type="submit" size="lg" className="w-full h-12 text-base">
                    <Send className="w-4 h-4 mr-2" />
                    Request Appointment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className={`lg:col-span-2 ${inView ? 'animate-slide-right stagger-4' : 'opacity-0'}`}>
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <List className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Your Appointments</h3>
                  </div>
                  {appointments.length > 0 && <Badge variant="secondary">{appointments.length}</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                {!loaded ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">Loading...</div>
                ) : appointments.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">No appointments yet. Submit the form to schedule your service.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {appointments.map((appt) => (
                      <div key={appt.id} className="p-3 rounded-xl border border-border/50 hover:border-primary/20 transition-colors group">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">{appt.name || 'Guest'}</p>
                            <p className="text-xs text-muted-foreground">{appt.carBrand} {appt.carModel}</p>
                            <Badge variant="outline" className="mt-1 text-[10px] h-5">{appt.service}</Badge>
                            {appt.date && <p className="text-[10px] text-primary mt-1 font-medium">{new Date(appt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>}
                            <p className="text-[10px] text-muted-foreground mt-0.5">{new Date(appt.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                          </div>
                          <button onClick={() => deleteAppt(appt.id)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 rounded transition-all">
                            <Trash2 className="w-3.5 h-3.5 text-destructive" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
