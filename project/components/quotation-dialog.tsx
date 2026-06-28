'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Plus, Trash2, IndianRupee } from 'lucide-react';

interface QuoteItem { id: string; service: string; description: string; quantity: number; price: number; }
interface Quotation { id: string; customerName: string; mobile: string; carBrand: string; carModel: string; items: QuoteItem[]; createdAt: string; }

const servicePrices: Record<string, number> = {
  'Car Inspection / Diagnostics': 499, 'Basic Service': 1999, 'Comprehensive Service': 3999,
  'AC Gas Refill': 999, 'AC Diagnostics': 499, 'Filter Replacement': 799, 'Scratch Removal': 1500,
  'Dent Repair': 2000, 'Full Panel Painting': 5000, 'Interior Cleaning': 1499, 'Deep Cleaning': 2999,
  'Wheel Alignment': 499, 'Wheel Balancing': 399, 'Tyre Replacement': 3500, 'Battery Inspection': 0,
  'Battery Replacement': 3500, 'Ceramic Coating': 5999, 'Teflon Coating': 2499, 'Paint Protection': 4499,
  'Glass Replacement': 700, 'Headlight Service': 800, 'Suspension Repair': 3000, 'Clutch Replacement': 4500,
  'Custom Diagnostics': 499,
};

export default function QuotationFeature() {
  const { value: quotations, set: setQuotations } = useLocalStorage<Quotation[]>('ace-quotations', []);
  const [open, setOpen] = useState(false);
  const [viewingQuotation, setViewingQuotation] = useState<Quotation | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [items, setItems] = useState<QuoteItem[]>([{ id: '1', service: '', description: '', quantity: 1, price: 0 }]);

  const addItem = () => setItems((prev) => [...prev, { id: Date.now().toString(), service: '', description: '', quantity: 1, price: 0 }]);
  const removeItem = (id: string) => setItems((prev) => prev.filter((item) => item.id !== id));
  const updateItem = (id: string, field: keyof QuoteItem, value: string | number) => {
    setItems((prev) => prev.map((item) => {
      if (item.id !== id) return item;
      const updated = { ...item, [field]: value };
      if (field === 'service' && typeof value === 'string') updated.price = servicePrices[value] || 0;
      return updated;
    }));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSave = () => {
    if (!customerName || !mobile || items.length === 0) return;
    const quotation: Quotation = { id: Date.now().toString(36), customerName, mobile, carBrand, carModel, items: items.filter((i) => i.service), createdAt: new Date().toISOString() };
    setQuotations((prev) => [quotation, ...prev]);
    setOpen(false);
    setCustomerName(''); setMobile(''); setCarBrand(''); setCarModel('');
    setItems([{ id: '1', service: '', description: '', quantity: 1, price: 0 }]);
  };

  const deleteQuotation = (id: string) => {
    setQuotations((prev) => prev.filter((q) => q.id !== id));
    if (viewingQuotation?.id === id) setViewingQuotation(null);
  };

  return (
    <section className="py-20 md:py-28 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 animate-fade-up">Quotations</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up stagger-1">Generate<span className="gradient-text"> Instant Quotations</span></h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg animate-fade-up stagger-2">Create detailed service quotations for your customers. Stored locally.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full h-14 text-base mb-6"><FileText className="w-5 h-5 mr-2" />Create New Quotation</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create Quotation</DialogTitle>
                  <DialogDescription>Add services and generate a quotation.</DialogDescription>
                </DialogHeader>
                <div className="space-y-5 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Customer Name *</Label><Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer name" /></div>
                    <div className="space-y-2"><Label>Mobile *</Label><Input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile number" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Car Brand</Label><Input value={carBrand} onChange={(e) => setCarBrand(e.target.value)} placeholder="e.g. Maruti Suzuki" /></div>
                    <div className="space-y-2"><Label>Car Model</Label><Input value={carModel} onChange={(e) => setCarModel(e.target.value)} placeholder="e.g. Swift" /></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between"><Label>Service Items</Label><Button type="button" variant="outline" size="sm" onClick={addItem}><Plus className="w-3 h-3 mr-1" />Add Item</Button></div>
                    {items.map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
                        <div className="col-span-5">
                          <Select value={item.service} onValueChange={(val) => updateItem(item.id, 'service', val)}>
                            <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Service" /></SelectTrigger>
                            <SelectContent>{Object.keys(servicePrices).map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-2"><Input type="number" min={1} value={item.quantity} onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)} className="h-9 text-sm" /></div>
                        <div className="col-span-4"><Input value={item.price} onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value) || 0)} className="h-9 text-sm" placeholder="Price" /></div>
                        <div className="col-span-1"><Button type="button" variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="h-9 w-9 p-0" disabled={items.length === 1}><Trash2 className="w-3 h-3 text-destructive" /></Button></div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-xl text-primary flex items-center gap-1"><IndianRupee className="w-4 h-4" />{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <Button onClick={handleSave} className="w-full" size="lg">Save Quotation</Button>
                </div>
              </DialogContent>
            </Dialog>
            {quotations.length === 0 ? (
              <Card className="border-border/50"><CardContent className="p-8 text-center"><FileText className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-muted-foreground text-sm">No quotations yet. Create one to get started.</p></CardContent></Card>
            ) : (
              <div className="space-y-3">
                {quotations.map((q) => (
                  <Card key={q.id} className="border-border/50 hover:border-primary/20 transition-colors cursor-pointer group" onClick={() => setViewingQuotation(q)}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-sm">{q.customerName}</p>
                          <p className="text-xs text-muted-foreground">{q.carBrand} {q.carModel} &middot; {q.items.length} item(s)</p>
                          <p className="text-[10px] text-muted-foreground mt-1">{new Date(q.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary text-sm flex items-center gap-0.5"><IndianRupee className="w-3 h-3" />{q.items.reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString('en-IN')}</span>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0" onClick={(e) => { e.stopPropagation(); deleteQuotation(q.id); }}><Trash2 className="w-3 h-3 text-destructive" /></Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          <div>
            {viewingQuotation ? (
              <Card className="border-border/50 shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"><span className="text-white font-bold text-lg">A</span></div>
                      <div><p className="font-bold">Ace Automotive</p><p className="text-xs text-muted-foreground">Jaipur, Rajasthan</p></div>
                    </div>
                    <Badge variant="outline" className="text-xs">QUOTATION</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div><p className="text-muted-foreground text-xs">Customer</p><p className="font-medium">{viewingQuotation.customerName}</p></div>
                    <div><p className="text-muted-foreground text-xs">Mobile</p><p className="font-medium">{viewingQuotation.mobile}</p></div>
                    <div><p className="text-muted-foreground text-xs">Vehicle</p><p className="font-medium">{viewingQuotation.carBrand} {viewingQuotation.carModel}</p></div>
                    <div><p className="text-muted-foreground text-xs">Date</p><p className="font-medium">{new Date(viewingQuotation.createdAt).toLocaleDateString('en-IN')}</p></div>
                  </div>
                  <div className="border border-border rounded-xl overflow-hidden mb-6">
                    <table className="w-full text-sm">
                      <thead><tr className="bg-muted/50"><th className="text-left px-4 py-2 font-medium text-xs text-muted-foreground">Service</th><th className="text-center px-4 py-2 font-medium text-xs text-muted-foreground">Qty</th><th className="text-right px-4 py-2 font-medium text-xs text-muted-foreground">Price</th><th className="text-right px-4 py-2 font-medium text-xs text-muted-foreground">Total</th></tr></thead>
                      <tbody>
                        {viewingQuotation.items.map((item) => (
                          <tr key={item.id} className="border-t border-border/50"><td className="px-4 py-2.5">{item.service}</td><td className="px-4 py-2.5 text-center">{item.quantity}</td><td className="px-4 py-2.5 text-right">&#8377;{item.price.toLocaleString('en-IN')}</td><td className="px-4 py-2.5 text-right font-medium">&#8377;{(item.price * item.quantity).toLocaleString('en-IN')}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <span className="font-semibold text-lg">Grand Total</span>
                    <span className="font-bold text-2xl text-primary flex items-center gap-1"><IndianRupee className="w-5 h-5" />{viewingQuotation.items.reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString('en-IN')}</span>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border/50 h-full"><CardContent className="p-8 text-center flex flex-col items-center justify-center min-h-[300px]"><FileText className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" /><p className="text-muted-foreground text-sm">Select a quotation to view details</p></CardContent></Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
