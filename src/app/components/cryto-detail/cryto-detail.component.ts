import { Component, type OnInit, ViewChild, Inject, PLATFORM_ID } from "@angular/core"
import  { ActivatedRoute, Router } from "@angular/router"
import { CommonModule, isPlatformBrowser } from "@angular/common"
import  { CryptoService } from "../../services/crypto.service"
import { Chart, type ChartData, type ChartOptions } from "chart.js"
import { BaseChartDirective, NgChartsModule } from "ng2-charts"
import "chartjs-adapter-date-fns" // Importante para manejar fechas en el eje X

// Registrar los componentes necesarios de Chart.js
import {
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler)

interface Cripto {
  name: string
  symbol: string
  slug: string
  cmc_rank: number
  total_supply: number
  max_supply: number
  circulating_supply: number
  quote: {
    USD: {
      price: number
      market_cap: number
      volume_24h: number
      volume_change_24h: number
      percent_change_24h: number
    }
  }
}

@Component({
  selector: "app-cryto-detail",
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: "./cryto-detail.component.html",
  styleUrl: "./cryto-detail.component.css",
})
export class CrytoDetailComponent implements OnInit {
  cripto: any[] = []
  priceHistory: any[] = []
  idcripto = ""
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private _criptoService: CryptoService,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective

  public lineChartData: ChartData<"line"> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: "Precio en USD",
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        fill: true,
        tension: 0.4, // Añade una curva suave a la línea
        pointBackgroundColor: "#007bff",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#007bff",
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  }

  public lineChartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#007bff",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#666",
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          color: "#666",
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  }

  ngOnInit(): void {
    this.idcripto = this.activatedroute.snapshot.paramMap.get("id") ?? ""
    this.getCryptoBy(this.idcripto)

    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    yesterday.setHours(12, 0, 0, 0) // Ayer a las 12:00:00 PM

    const from = this.formatDateTime(yesterday)
    const to = this.formatDateTime(today) // Hoy a la hora actual

    this._criptoService.getPriceHistory(this.idcripto, from, to).subscribe(
      (data) => {
        this.priceHistory = data

        const prices = data.map((item: any) => item.price)
        const dates = data.map((item: any) => new Date(item.fetched_at).toLocaleTimeString())

        this.lineChartData.labels = dates
        this.lineChartData.datasets[0].data = prices

        // Actualizar el gráfico después de recibir los datos
        if (this.chart) {
          this.chart.update()
        }

        console.log("Historial de precios:", this.priceHistory)
      },
      (error) => {
        console.error("Error obteniendo historial:", error)
      },
    )
  }

  private formatDateTime(date: Date): string {
    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, "0")
    const dd = String(date.getDate()).padStart(2, "0")
    const hh = String(date.getHours()).padStart(2, "0")
    const mi = String(date.getMinutes()).padStart(2, "0")
    const ss = String(date.getSeconds()).padStart(2, "0")
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`
  }

  getCryptoBy(id: string) {
    this._criptoService.getCrytoById(id).subscribe((data: any) => {
      this.cripto = Object.keys(data.data).map((key) => data.data[key])
      console.log(this.cripto)
    })
  }
}
