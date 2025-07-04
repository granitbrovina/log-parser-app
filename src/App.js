// src/App.js

import React, { useState } from 'react';
import {
  Layout,
  Upload,
  Button,
  Typography,
  Row,
  Col,
  Card,
  Descriptions,
  Table,
  Result,
  message,
  Spin,
  Divider,
} from 'antd';
import { UploadOutlined, InfoCircleOutlined, WarningOutlined, CodeOutlined } from '@ant-design/icons';
import { parseLogFile } from './LogParser';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const App = () => {
  const [analysis, setAnalysis] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (file) => {
    if (file.type !== 'text/plain') {
      message.error('Invalid file type. Please upload a .txt file.');
      return false;
    }
    setLoading(true);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setTimeout(() => {
        try {
          const results = parseLogFile(content);
          setAnalysis(results);
          message.success(`${file.name} analyzed successfully.`);
        } catch (error) {
          message.error('An error occurred during file parsing.');
          console.error("Parsing error:", error);
        } finally {
          setLoading(false);
        }
      }, 500);
    };
    reader.onerror = () => {
      message.error('Failed to read the file.');
      setLoading(false);
    };
    reader.readAsText(file);
    return false;
  };

  const resetState = () => {
    setAnalysis(null);
    setFileName('');
  };

  const errorColumns = [
    {
      title: 'Line',
      dataIndex: 'lineNumber',
      key: 'lineNumber',
      width: 80,
      sorter: (a, b) => a.lineNumber - b.lineNumber,
      defaultSortOrder: 'ascend',
    },
    {
      title: 'Error Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Log Entry',
      dataIndex: 'logLine',
      key: 'logLine',
      render: (text) => <Text code className="log-line-text">{text}</Text>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', fontFamily: 'Noto Sans' }}>
      <Header style={{ backgroundColor: '#001529', padding: '0 24px', display: 'flex', alignItems: 'center' }}>
        <CodeOutlined style={{ color: '#1890ff', fontSize: '28px', marginRight: '16px' }} />
        {/* --- CHANGE 1: Header Title --- */}
        <Title level={3} style={{ color: 'white', lineHeight: '64px', margin: 0 }}>
          Joan Device Log Analyzer
        </Title>
      </Header>
      <Content style={{ padding: '24px 48px' }}>
        <Card bordered={false} style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          {!analysis ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <Spin spinning={loading} size="large" tip="Analyzing...">
                {/* --- CHANGE 2: Main Page Title --- */}
                <Title level={2}>Upload Your Joan device Log File</Title>
                <Paragraph type="secondary">
                  Select a .txt log file to begin analysis. The app will automatically extract device information and identify known errors.
                </Paragraph>
                <Upload.Dragger
                  beforeUpload={handleFileUpload}
                  showUploadList={false}
                  accept=".txt"
                  height={200}
                >
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag .txt file to this area to upload</p>
                  <p className="ant-upload-hint">
                    Supports single file upload. Your data is processed in the browser and is not sent to any server.
                  </p>
                </Upload.Dragger>
              </Spin>
            </div>
          ) : (
            <div>
              <Title level={3}>Analysis Results for: <Text type="secondary">{fileName}</Text></Title>
              <Row gutter={[24, 24]}>
                <Col span={24}>
                  <Card title={<><InfoCircleOutlined /> Device Information</>} bordered={false}>
                    <Descriptions bordered column={1} size="small">
                      <Descriptions.Item label="Device UUID">{analysis.deviceInfo.deviceUUID}</Descriptions.Item>
                      <Descriptions.Item label="Firmware Version">{analysis.deviceInfo.firmwareVersion}</Descriptions.Item>
                      <Descriptions.Item label="Bootloader Version">{analysis.deviceInfo.bootloaderVersion}</Descriptions.Item>
                      <Descriptions.Item label="Battery Level">{analysis.deviceInfo.batteryLevel}%</Descriptions.Item>
                      <Descriptions.Item label="Network Module">{analysis.deviceInfo.networkModule}</Descriptions.Item>
                      <Descriptions.Item label="Wi-Fi Name / SSID">{analysis.deviceInfo.ssid}</Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card title={<><WarningOutlined /> Error Summary</>} bordered={false}>
                    {analysis.errors.length > 0 ? (
                      <Table
                        columns={errorColumns}
                        dataSource={analysis.errors}
                        rowKey="key"
                        pagination={{ pageSize: 10, showSizeChanger: true }}
                        size="middle"
                      />
                    ) : (
                      <Result
                        status="success"
                        title="No Errors Found!"
                        subTitle="The log file was analyzed and no known error conditions were detected."
                      />
                    )}
                  </Card>
                </Col>
              </Row>
              <Divider />
              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <Button type="primary" onClick={resetState} style={{ backgroundColor: '#1890ff' }} size="large">
                  Analyze Another Log
                </Button>
              </div>
            </div>
          )}
        </Card>
      </Content>
      {/* --- CHANGE 3: Footer Text --- */}
      <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: 'rgba(255, 255, 255, 0.65)' }}>
        Joan Log Parser App ©2025
      </Footer>
    </Layout>
  );
};

export default App;