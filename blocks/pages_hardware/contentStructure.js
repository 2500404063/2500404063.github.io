var contentArray = {
    "Default Page": "./pages_hardware/default/default.md",
    "从MSC-51看MCU": {
        "基本概念": "./pages_hardware/mcustudy/1.md",
        "GPIO": "./pages_hardware/mcustudy/2.md",
        "Clock": "./pages_hardware/mcustudy/3.md",
        "Timer": "./pages_hardware/mcustudy/4.md",
        "UART": "./pages_hardware/mcustudy/5.md",
        "EEPROM": "./pages_hardware/mcustudy/6.md",
        "比较器": "./pages_hardware/mcustudy/7.md",
        "ADC模数转换": "./pages_hardware/mcustudy/8.md",
        "PCA/CCP": "./pages_hardware/mcustudy/9.md",
        "SPI": "./pages_hardware/mcustudy/10.md"
    },
    'ARM Core': {
        'ARM编译器': './pages_hardware/arm/10.md',
        'ARM IDE(PlatformIO)': './pages_hardware/arm/20.md',
        'LD链接文件': './pages_hardware/arm/30.md',
        'Startup编写': './pages_hardware/arm/40.md',
        '实战构建ARM-GCC项目': './pages_hardware/arm/50.md'
    },
    'FPGA': {
        '可编程逻辑器件的发展': './pages_hardware/fpga/5.md',
        'FPGA原理': './pages_hardware/fpga/10.md',
        'Verilog规范': './pages_hardware/fpga/20.md',
        'Verilog的编译过程': './pages_hardware/fpga/30.md',
        '仿真模式': './pages_hardware/fpga/40.md',
        '原语和IP核': './pages_hardware/fpga/50.md',
        '时钟': './pages_hardware/fpga/60.md',
        '流水线Pipeline': './pages_hardware/fpga/70.md',
        'SRAM IP': './pages_hardware/fpga/80.md',
        'UART协议实现': './pages_hardware/fpga/90.md',
        'FPGA设计技巧': './pages_hardware/fpga/100.md',
        '流水线思想': './pages_hardware/fpga/110.md'
    },
    '控制论': {
        'PID Algorithm': './pages_hardware/robot/10.pid.md',
        'Mean Filter': './pages_hardware/robot/20.md',
        'Kalman Filter': './pages_hardware/robot/30.md',
        'Kalman Filter Example': './pages_hardware/robot/40.md',
        'KF Filters Gaussian Noise': './pages_hardware/robot/50.md'
    },
    '数字电路': {
        '电路分析': {
            '复杂电路分析': './pages_hardware/digital/10.md',
        },
        '触发器': './pages_hardware/digital/20.md',
        '时序电路设计': './pages_hardware/digital/30.md',
        '半导体储存': './pages_hardware/digital/40.md'
    },
    '模拟电路': {
        '非理想环境的知识': './pages_hardware/analog/0.reality.md',
        '二极管': './pages_hardware/analog/1.二极管.md',
        '三极管': './pages_hardware/analog/2.三极管.md',
        '场效应管': './pages_hardware/analog/3.FET.md',
        'TTL基本放到电路': './pages_hardware/analog/4.TTL基本放大电路.md',
        'MOS放大电路': './pages_hardware/analog/5.MOS放大电路.md',
        '放大电路总结': './pages_hardware/analog/6.放大电路总结.md',
        '差分电路': './pages_hardware/analog/7.差分电路.md',
        '功率放大电路': './pages_hardware/analog/8.功率放大电路.md',
        '集成运算放大电路': './pages_hardware/analog/9.集成运算放大电路.md',
        '反馈放大电路': './pages_hardware/analog/10.反馈放大电路.md',
    },
    'PCB设计规范': {
        '基本概念': './pages_hardware/pcbdesign/1.definitions.md',
        'PCB分层设计': './pages_hardware/pcbdesign/2.pcblayers.md',
        'PCB设计思想': './pages_hardware/pcbdesign/5.thinking.md',
        '线宽线距': './pages_hardware/pcbdesign/10.line.md',
    },
    'AXI总线协议': {
        'AXI总线介绍': './pages_hardware/axi/10.md',
        'AXI总线信号描述': './pages_hardware/axi/20.md',
        'AXI单接口协议分析': './pages_hardware/axi/30.md',
        'AXI总线事务结构': './pages_hardware/axi/40.md'
    },
    'AHB|APB总线协议': {

    },
    'USB通用串行总线': {
        'USB百科': './pages_hardware/usb/10.usb.md',
        'USB2.0协议': {
            'USB2.0简介': './pages_hardware/usb/usb2.0/10.usb2.0.md',
            'USB2.0数据模型': './pages_hardware/usb/usb2.0/20.usb2.0.md',
            'USB2.0物理层电信号': './pages_hardware/usb/usb2.0/30.usb2.0.md',
            'USB2.0协议层': './pages_hardware/usb/usb2.0/40.usb2.0.md',
            'USB2.0设备框架': './pages_hardware/usb/usb2.0/50.usb2.0.md',
            'USB2.0主机的硬件和软件': './pages_hardware/usb/usb2.0/60.usb2.0.md',
            'USB2.0集线器Hub': './pages_hardware/usb/usb2.0/70.usb2.0.md'
        },
        'HID设备实战': {
            'HID描述符': './pages_hardware/usb/hid/10.hid.md',
            'HID报告描述符': './pages_hardware/usb/hid/20.hid.md',
            'HID主项目': './pages_hardware/usb/hid/30.hid.md',
            'HID全局项目': './pages_hardware/usb/hid/40.hid.md',
            'HID局部项目': './pages_hardware/usb/hid/50.hid.md',
            'HID协议层请求': './pages_hardware/usb/hid/60.hid.md',
            'HID报告描述符实战': './pages_hardware/usb/hid/70.hid.md'
        }
    }
    // '芯片使用经验': {
    //     '电源': {
    //         '电源转换稳压芯片': './pages_hardware/pcb_power/10.high2low.md'
    //     },
    //     '储存': {
    //         'EEPORM': 'null'
    //     }
    // }
};