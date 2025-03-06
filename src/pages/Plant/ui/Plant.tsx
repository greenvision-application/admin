import { useState } from 'react';
import { Table } from '../../../components';
import type { ActionColumn } from '../../../components';

interface PlantTable {
  id: number;
  name: string;
  scientificName: string;
  image: string;
  overview: string;
  characteristic: string;
  function: string;
  meaning: string;
  difficulty_level: 'EASY' | 'MEDIUM' | 'HARD';
  soil_type: 'CLAY' | 'SANDY' | 'SILTY' | 'PEATY' | 'CHALKY' | 'LOAMY';
  category_id: string;
  habitatLocation: 'INDOOR' | 'OUTDOOR' | 'BOTH';
  minTemperature: number;
  maxTemperature: number;
  minMatureSize: number;
  maxMatureSize: number;
  humidityRange: 'LOW' | 'MEDIUM' | 'HIGH';
  lightRequirement: 'LOW' | 'MEDIUM' | 'HIGH';
  approved_content: boolean;
}

interface PlantColumn {
  key: keyof Omit<PlantTable, 'id'>;
  title: string;
  render?: (plant: PlantTable) => JSX.Element;
}

const initialPlantData: PlantTable[] = [
  {
    id: 1,
    name: 'Lúa',
    scientificName: 'Oryza sativa',
    image: 'https://avatar.iran.liara.run/public/job/firefighters/male',
    overview: 'Cây lúa là một loại cây lương thực chính',
    characteristic: 'Thân thẳng, lá dài, hạt nhỏ',
    function: 'Cung cấp lương thực',
    meaning: 'Biểu tượng của nền nông nghiệp',
    difficulty_level: 'MEDIUM',
    soil_type: 'CLAY',
    category_id: '1',
    habitatLocation: 'OUTDOOR',
    minTemperature: 20,
    maxTemperature: 35,
    minMatureSize: 0.5,
    maxMatureSize: 1.5,
    humidityRange: 'HIGH',
    lightRequirement: 'HIGH',
    approved_content: true
  },
  {
    id: 2,
    name: 'Ngô',
    scientificName: 'Zea mays',
    image: 'https://avatar.iran.liara.run/public/job/firefighters/male',
    overview: 'Cây ngô là cây lương thực phổ biến',
    characteristic: 'Thân to, lá rộng, bắp dài',
    function: 'Thực phẩm và thức ăn chăn nuôi',
    meaning: 'Đại diện cho sự phát triển nông nghiệp',
    difficulty_level: 'MEDIUM',
    soil_type: 'LOAMY',
    category_id: '1',
    habitatLocation: 'OUTDOOR',
    minTemperature: 15,
    maxTemperature: 30,
    minMatureSize: 1.5,
    maxMatureSize: 2.5,
    humidityRange: 'MEDIUM',
    lightRequirement: 'HIGH',
    approved_content: true
  },
  {
    id: 3,
    name: 'Cà phê',
    scientificName: 'Coffea robusta',
    image: 'https://avatar.iran.liara.run/public/job/firefighters/male',
    overview: 'Cây công nghiệp quan trọng',
    characteristic: 'Thân gỗ nhỏ, lá xanh đậm',
    function: 'Sản xuất đồ uống',
    meaning: 'Biểu tượng của văn hóa thưởng thức',
    difficulty_level: 'HARD',
    soil_type: 'LOAMY',
    category_id: '2',
    habitatLocation: 'OUTDOOR',
    minTemperature: 18,
    maxTemperature: 28,
    minMatureSize: 2,
    maxMatureSize: 4,
    humidityRange: 'MEDIUM',
    lightRequirement: 'MEDIUM',
    approved_content: true
  }
];

const TopPlantedPlants: React.FC = () => {
  const [plantData, setPlantData] = useState<PlantTable[]>(initialPlantData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlant, setNewPlant] = useState<Omit<PlantTable, 'id'>>({
    name: '',
    scientificName: '',
    image: '',
    overview: '',
    characteristic: '',
    function: '',
    meaning: '',
    difficulty_level: 'EASY',
    soil_type: 'LOAMY',
    category_id: '',
    habitatLocation: 'INDOOR',
    minTemperature: 0,
    maxTemperature: 0,
    minMatureSize: 0,
    maxMatureSize: 0,
    humidityRange: 'MEDIUM',
    lightRequirement: 'MEDIUM',
    approved_content: false
  });

  const handleEdit = (id: number) => {
    const plantToEdit = plantData.find(plant => plant.id === id);
    if (plantToEdit) {
      setNewPlant({
        name: plantToEdit.name,
        scientificName: plantToEdit.scientificName,
        image: plantToEdit.image,
        overview: plantToEdit.overview,
        characteristic: plantToEdit.characteristic,
        function: plantToEdit.function,
        meaning: plantToEdit.meaning,
        difficulty_level: plantToEdit.difficulty_level,
        soil_type: plantToEdit.soil_type,
        category_id: plantToEdit.category_id,
        habitatLocation: plantToEdit.habitatLocation,
        minTemperature: plantToEdit.minTemperature,
        maxTemperature: plantToEdit.maxTemperature,
        minMatureSize: plantToEdit.minMatureSize,
        maxMatureSize: plantToEdit.maxMatureSize,
        humidityRange: plantToEdit.humidityRange,
        lightRequirement: plantToEdit.lightRequirement,
        approved_content: plantToEdit.approved_content
      });
      setShowAddForm(true);
    }
  };
  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc muốn xóa không?')) {
      setPlantData(prev => prev.filter(plant => plant.id !== id));
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return url.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i) !== null;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleAddPlant = () => {
    if (
      !newPlant.name ||
      !newPlant.scientificName ||
      !newPlant.image ||
      !newPlant.overview ||
      !newPlant.characteristic ||
      !newPlant.function ||
      !newPlant.meaning ||
      !newPlant.category_id
    ) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    if (!isValidUrl(newPlant.image)) {
      alert(
        'URL hình ảnh không hợp lệ! Vui lòng nhập URL kết thúc bằng .jpg, .jpeg, .png, .gif, .bmp hoặc .webp'
      );
      return;
    }

    const newId = Math.max(...plantData.map(p => p.id)) + 1;
    setPlantData(prev => [...prev, { ...newPlant, id: newId }]);
    setShowAddForm(false);
    setNewPlant({
      name: '',
      scientificName: '',
      image: '',
      overview: '',
      characteristic: '',
      function: '',
      meaning: '',
      difficulty_level: 'EASY',
      soil_type: 'LOAMY',
      category_id: '',
      habitatLocation: 'INDOOR',
      minTemperature: 0,
      maxTemperature: 0,
      minMatureSize: 0,
      maxMatureSize: 0,
      humidityRange: 'MEDIUM',
      lightRequirement: 'MEDIUM',
      approved_content: false
    });
  };

  const plantColumns: PlantColumn[] = [
    {
      key: 'image',
      title: 'Hình ảnh',
      render: (plant: PlantTable) => (
        <img
          src={plant.image}
          alt={plant.name}
          className="h-10 w-10 rounded-full object-cover"
        />
      )
    },
    { key: 'name', title: 'Tên cây trồng' },
    { key: 'scientificName', title: 'Tên khoa học' },
    { key: 'overview', title: 'Tổng quan' },
    { key: 'characteristic', title: 'Đặc điểm' },
    { key: 'function', title: 'Công dụng' },
    { key: 'meaning', title: 'Ý nghĩa' }
  ];

  const actionColumn: ActionColumn<PlantTable> = {
    title: 'Hành động',
    actions: [
      {
        label: 'Sửa',
        onClick: plant => handleEdit(plant.id),
        className: 'bg-blue-400 hover:bg-blue-600'
      },
      {
        label: 'Xóa',
        onClick: plant => handleDelete(plant.id),
        className: 'bg-red-400 hover:bg-red-700'
      }
    ]
  };

  return (
    <>
      <div className="flex justify-end pt-5 pr-2 pb-0.5">
        <button
          onClick={() => setShowAddForm(true)}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-900"
        >
          Thêm cây mới
        </button>
      </div>

      {showAddForm && (
        <div className="mb-4 rounded border p-4">
          <h2 className="mb-4 text-xl font-bold">Thêm cây mới</h2>
          {plantColumns.map(column =>
            column.key !== 'image' ? (
              <div key={column.key} className="mb-3">
                <label className="mb-1 block text-sm font-medium">
                  {column.title} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={String(newPlant[column.key as keyof typeof newPlant])}
                  onChange={e =>
                    setNewPlant(prev => ({
                      ...prev,
                      [column.key]: e.target.value
                    }))
                  }
                  className="w-full rounded border p-2"
                  required
                />
              </div>
            ) : (
              <div key={column.key} className="mb-3">
                <label className="mb-1 block text-sm font-medium">
                  {column.title} (URL) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newPlant.image}
                  onChange={e =>
                    setNewPlant(prev => ({ ...prev, image: e.target.value }))
                  }
                  className="w-full rounded border p-2"
                  required
                  placeholder="Nhập URL kết thúc bằng .jpg, .jpeg, .png, .gif, .bmp hoặc .webp"
                />
              </div>
            )
          )}

          <div className="mb-3">
            <label className="mb-1 block text-sm font-medium">
              Mức độ khó <span className="text-red-500">*</span>
            </label>
            <select
              value={newPlant.difficulty_level}
              onChange={e =>
                setNewPlant(prev => ({
                  ...prev,
                  difficulty_level: e.target.value as 'EASY' | 'MEDIUM' | 'HARD'
                }))
              }
              className="w-full rounded border p-2"
            >
              <option value="EASY">Dễ</option>
              <option value="MEDIUM">Trung bình</option>
              <option value="HARD">Khó</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="mb-1 block text-sm font-medium">
              Loại đất <span className="text-red-500">*</span>
            </label>
            <select
              value={newPlant.soil_type}
              onChange={e =>
                setNewPlant(prev => ({
                  ...prev,
                  soil_type: e.target.value as
                    | 'CLAY'
                    | 'SANDY'
                    | 'SILTY'
                    | 'PEATY'
                    | 'CHALKY'
                    | 'LOAMY'
                }))
              }
              className="w-full rounded border p-2"
            >
              <option value="LOAMY">Đất thịt</option>
              <option value="SANDY">Đất cát</option>
              <option value="CLAY">Đất sét</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="mb-1 block text-sm font-medium">
              ID Danh mục <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newPlant.category_id}
              onChange={e =>
                setNewPlant(prev => ({ ...prev, category_id: e.target.value }))
              }
              className="w-full rounded border p-2"
              required
            />
          </div>

          <div className="mb-3">
            <label className="mb-1 block text-sm font-medium">
              Vị trí sinh sống <span className="text-red-500">*</span>
            </label>
            <select
              value={newPlant.habitatLocation}
              onChange={e =>
                setNewPlant(prev => ({
                  ...prev,
                  habitatLocation: e.target.value as
                    | 'INDOOR'
                    | 'OUTDOOR'
                    | 'BOTH'
                }))
              }
              className="w-full rounded border p-2"
            >
              <option value="INDOOR">Trong nhà</option>
              <option value="OUTDOOR">Ngoài trời</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="mb-1 block text-sm font-medium">
              Nhiệt độ (°C) <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={newPlant.minTemperature}
                onChange={e =>
                  setNewPlant(prev => ({
                    ...prev,
                    minTemperature: Number(e.target.value)
                  }))
                }
                className="w-1/2 rounded border p-2"
                placeholder="Tối thiểu"
                required
              />
              <input
                type="number"
                value={newPlant.maxTemperature}
                onChange={e =>
                  setNewPlant(prev => ({
                    ...prev,
                    maxTemperature: Number(e.target.value)
                  }))
                }
                className="w-1/2 rounded border p-2"
                placeholder="Tối đa"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="mb-1 block text-sm font-medium">
              Kích thước trưởng thành (m){' '}
              <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={newPlant.minMatureSize}
                onChange={e =>
                  setNewPlant(prev => ({
                    ...prev,
                    minMatureSize: Number(e.target.value)
                  }))
                }
                className="w-1/2 rounded border p-2"
                placeholder="Tối thiểu"
                required
              />
              <input
                type="number"
                value={newPlant.maxMatureSize}
                onChange={e =>
                  setNewPlant(prev => ({
                    ...prev,
                    maxMatureSize: Number(e.target.value)
                  }))
                }
                className="w-1/2 rounded border p-2"
                placeholder="Tối đa"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="mb-1 block text-sm font-medium">
              Độ ẩm <span className="text-red-500">*</span>
            </label>
            <select
              value={newPlant.humidityRange}
              onChange={e =>
                setNewPlant(prev => ({
                  ...prev,
                  humidityRange: e.target.value as 'LOW' | 'MEDIUM' | 'HIGH'
                }))
              }
              className="w-full rounded border p-2"
            >
              <option value="LOW">Thấp</option>
              <option value="MEDIUM">Trung bình</option>
              <option value="HIGH">Cao</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="mb-1 block text-sm font-medium">
              Yêu cầu ánh sáng <span className="text-red-500">*</span>
            </label>
            <select
              value={newPlant.lightRequirement}
              onChange={e =>
                setNewPlant(prev => ({
                  ...prev,
                  lightRequirement: e.target.value as 'LOW' | 'MEDIUM' | 'HIGH'
                }))
              }
              className="w-full rounded border p-2"
            >
              <option value="LOW">Thấp</option>
              <option value="MEDIUM">Trung bình</option>
              <option value="HIGH">Cao</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddPlant}
              className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              Lưu
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      <Table
        data={plantData}
        columns={plantColumns}
        actionColumn={actionColumn}
      />
    </>
  );
};
export default TopPlantedPlants;
