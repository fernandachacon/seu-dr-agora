import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';

type Slot = { time: string; available: boolean };

@Component({
  selector: 'app-agendamentos',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './agendamentos.html',
  styleUrls: ['./agendamentos.scss'], 
})
export class Agendamentos {
  // “Hoje”
  private readonly now = new Date();

  // Mês visível no calendário
  viewYear = signal(this.now.getFullYear());
  viewMonth = signal(this.now.getMonth()); // 0-11

  // Dia selecionado
  selectedDate = signal<Date | null>(
    new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate())
  );

  // Horário selecionado
  selectedSlot = signal<Slot | null>(null);

  // Mock de horários (depois vem do Back)
  slots = signal<Slot[]>([
    { time: '08:00', available: true },
    { time: '09:00', available: false },
    { time: '10:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: false },
  ]);

  // ✅ "Março de 2026" (de minúsculo)
  monthLabel = computed(() => {
    const year = this.viewYear();
    const month = this.viewMonth();

    const monthName = new Date(year, month, 1).toLocaleDateString('pt-BR', { month: 'long' });
    const monthCap = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    return `${monthCap} de ${year}`;
  });

  // Grid de dias do mês (com “buracos” no começo)
  daysGrid = computed(() => {
    const y = this.viewYear();
    const m = this.viewMonth();

    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);

    // No Brasil: semana geralmente começa no domingo no JS (0=domingo)
    const startPadding = first.getDay(); // 0-6
    const totalDays = last.getDate();

    const grid: Array<{ date: Date | null; day: number | null }> = [];

    for (let i = 0; i < startPadding; i++) grid.push({ date: null, day: null });
    for (let day = 1; day <= totalDays; day++) grid.push({ date: new Date(y, m, day), day });

    // completa até múltiplo de 7 (visual)
    while (grid.length % 7 !== 0) grid.push({ date: null, day: null });

    return grid;
  });

  isSelected(d: Date) {
    const s = this.selectedDate();
    if (!s) return false;
    return d.getFullYear() === s.getFullYear() && d.getMonth() === s.getMonth() && d.getDate() === s.getDate();
  }

  prevMonth() {
    const newDate = new Date(this.viewYear(), this.viewMonth() - 1, 1);
    this.viewYear.set(newDate.getFullYear());
    this.viewMonth.set(newDate.getMonth());
    this.selectedSlot.set(null); // limpa seleção de horário ao trocar mês
  }

  nextMonth() {
    const newDate = new Date(this.viewYear(), this.viewMonth() + 1, 1);
    this.viewYear.set(newDate.getFullYear());
    this.viewMonth.set(newDate.getMonth());
    this.selectedSlot.set(null); // limpa seleção de horário ao trocar mês
  }

  selectDay(d: Date) {
    this.selectedDate.set(d);
    this.selectedSlot.set(null); // ✅ muda o dia, limpa o horário

    // depois: chamar o Back para buscar horários disponíveis daquele dia
    // this.agendamentoService.getSlots(d).subscribe(...)
  }

  selectSlot(slot: Slot) {
    if (!slot.available) return;
    this.selectedSlot.set(slot);
  }

  isSlotSelected(slot: Slot) {
    const s = this.selectedSlot();
    return !!s && s.time === slot.time;
  }

  confirmarAgendamento() {
    const d = this.selectedDate();
    const s = this.selectedSlot();
    if (!d || !s) return;

    // depois: POST pro Back (criar agendamento)
    // this.agendamentoService.create({ date: d, time: s.time, ... }).subscribe(...)

    // ✅ Mensagem editável aqui
    alert(`Consulta confirmada para ${d.toLocaleDateString('pt-BR')} às ${s.time}.`);
  }
}